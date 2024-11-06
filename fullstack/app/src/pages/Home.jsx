import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import logic from '../logic'

import { Button, Link } from '../library'
import { Posts, Profile, NewPost, UserPosts } from '../components'
import logo from '../assets/logo-w.png'

import { useContext } from '../hooks'


function Home(props) {
    console.log('Home')

    const context = useContext()

    const [view, setView] = useState(null)
    const [name, setName] = useState(null)
    const [stamp, setStamp] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    function handleLogoutClick() {
        logic.logoutUser(error => {
            if (error) {
                context.handleError(error)

                return
            }
        })

        props.onLogoutClick()
    }

    useEffect(() => {
        console.log('Home -> effect (name)')

        try {
            logic.retrieveUser()
                .then(user => setName(user.name))
                .catch(error => context.handleError(error))
        } catch (error) {
            context.handleError(error)
        }
    }, [])

    function handleProfileClick(event) {
        event.preventDefault()

        navigate('/profile')
    }

    function handleHomeClick(event) {
        event.preventDefault()

        navigate('/')
    }

    function handleNewPostClick() {
        setView('new-post')
    }

    function handleNewPostCancel() {
        setView(null)
    }

    function handleNewPostPublish() {
        setStamp(Date.now())
        setView(null)
        navigate('/')

        window.scrollTo(0, 0)
    }

    function handleFavPostsClick(event) {
        event.preventDefault()

        navigate('/favs')
    }

    return <div>
        <header className="header">
            <h1>
                <a onClick={handleHomeClick}>
                    <img src={logo} alt="Home" style={{ width: '150px', height: '60px' }} />
                </a>
            </h1>

            <div>
                <Link onClick={handleProfileClick}>{name}</Link> <Link onClick={handleFavPostsClick}>Favs</Link> <Button onClick={handleLogoutClick}>Logout</Button>
            </div>
        </header>

        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/favs" element={<Posts loadPosts={logic.retrieveFavPosts} />} />
            <Route path="/users/:userId" element={<UserPosts />} />
            <Route path="/" element={<Posts loadPosts={logic.retrievePosts} stamp={stamp} />} />
        </Routes>

        <footer className="footer">
            {view === 'new-post' && <NewPost onPublish={handleNewPostPublish} onCancel={handleNewPostCancel} />}

            {view !== 'new-post' && location.pathname !== '/profile' && location.pathname !== '/favs' && <Button onClick={handleNewPostClick}>+</Button>}
        </footer>
    </div>
}

export default Home