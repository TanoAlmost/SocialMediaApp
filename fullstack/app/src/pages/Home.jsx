import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import logic from '../logic';

import { Button, Link } from '../library';
import { Posts, Profile, NewPost, UserPosts, Settings } from '../components'; // Importar Settings
import logo from '../assets/logo-w.png';

import session from '../logic/session';

import { useContext } from '../hooks';

function Home(props) {
    console.log('Home');

    const context = useContext();

    const [view, setView] = useState(null);
    const [name, setName] = useState(null);
    const [stamp, setStamp] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('Home -> effect (name)');

        try {
            logic.retrieveUser()
                .then(user => setName(user.name))
                .catch(error => context.handleError(error));
        } catch (error) {
            context.handleError(error);
        }
    }, []);

    function handleProfileClick(event) {
        event.preventDefault();
        navigate(`/users/${session.sessionUserId}`); // Redirigir a UserPosts
    }

    function handleSettingsClick(event) {
        event.preventDefault();
        navigate('/settings'); // Redirigir a Settings
    }

    function handleHomeClick(event) {
        event.preventDefault();
        navigate('/');
    }

    function handleFavPostsClick(event) {
        event.preventDefault();
        navigate('/favs');
    }

    function handleNewPostClick() {
        setView('new-post');
    }

    function handleNewPostCancel() {
        setView(null);
    }

    function handleNewPostPublish() {
        setStamp(Date.now());
        setView(null);
        navigate('/');
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <header className="header">
                <h1>
                    <a onClick={handleHomeClick}>
                        <img src={logo} alt="Home" style={{ width: '150px', height: '60px' }} />
                    </a>
                </h1>

                <div>
                    <Link onClick={handleProfileClick}>{name}</Link>
                    <Link onClick={handleFavPostsClick}>Favs</Link>
                    <Link onClick={handleSettingsClick}>Settings</Link>
                </div>
            </header>

            <Routes>
                <Route path="/settings" element={<Settings onLogoutClick={props.onLogoutClick} />} /> {/* Pasar onLogoutClick */}
                <Route path="/favs" element={<Posts loadPosts={logic.retrieveFavPosts} />} />
                <Route path="/users/:userId" element={<UserPosts />} />
                <Route path="/" element={<Posts loadPosts={logic.retrievePosts} stamp={stamp} />} />
            </Routes>

            <footer className="footer">
                {view === 'new-post' && <NewPost onPublish={handleNewPostPublish} onCancel={handleNewPostCancel} />}

                {view !== 'new-post' &&
                    location.pathname !== '/settings' &&
                    location.pathname !== '/favs' && <Button onClick={handleNewPostClick}>+</Button>}
            </footer>
        </div>
    );
}

export default Home;
