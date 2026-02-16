import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import retrieveUserProfile from '../logic/retrieveUserProfile';
import retrieveUserPosts from '../logic/retrieveUserPosts';
import updateUserProfile from '../logic/updateUserProfile';
import UserInfo from './UserInfo';
import EditUserInfo from './EditUserInfo';
import session from '../logic/session'; // Importar la sesión
import Post from './Post'; // Importar el componente Post
import Posts from './Posts';

export default function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loggedInUserId = session.sessionUserId; // ID del usuario autenticado
    const isOwner = userId === loggedInUserId; // Verifica si el perfil pertenece al usuario autenticado

    useEffect(() => {
        let intervalId;
        let cancelled = false;

        const normalizePosts = (userPosts) =>
            Array.isArray(userPosts) ? [...userPosts].reverse() : [];

        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = await retrieveUserProfile(userId);
                const userPosts = await retrieveUserPosts(userId);

                if (cancelled) return;

                setUser(userData);
                console.log("REFRESH posts[0] comments:", userPosts?.[0]?.comments?.length)

                setPosts(normalizePosts(userPosts));
            } catch (error) {
                if (cancelled) return;
                setError(error.message);
            } finally {
                if (cancelled) return;
                setLoading(false);
            }
        };

        const refreshPosts = async () => {
            try {
                const userPosts = await retrieveUserPosts(userId);
                if (cancelled) return;
                setPosts(normalizePosts(userPosts));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        intervalId = setInterval(() => {
            refreshPosts();
        }, 3000);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [userId]);


    // Manejar la actualización del perfil
    const handleSave = async (profileData) => {
        try {
            await updateUserProfile(userId, profileData);

            const updatedUser = await retrieveUserProfile(userId);
            const userPosts = await retrieveUserPosts(userId);

            setUser(updatedUser);
            setPosts(Array.isArray(userPosts) ? [...userPosts].reverse() : []);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
            setError('Unable to update user information.');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading user information...</div>;
    }


    return (
        <div className="profile">
            {editing ? (
                <EditUserInfo user={user} onSave={handleSave} onCancel={() => setEditing(false)} />
            ) : (
                <UserInfo user={user} isOwner={isOwner} onEditClick={() => setEditing(true)} />
            )}

            <section className="user-posts">
                <h1>Posts</h1>
                {posts.length === 0 ? (
                    <p>This user has not created any posts yet.</p>
                ) : (
                    posts.map((post) => {
                        console.log('Post author:', post.author);
                        console.log('Logged in user ID:', loggedInUserId);
                        console.log('Is owner:', post.author && post.author.id === loggedInUserId);

                        return (
                            <Post
                                key={post.id}
                                post={post}
                                isOwner={(post.author?._id || post.author?.id) === loggedInUserId}
                                onToggleLikeClick={async () => {
                                    const updatedPosts = await retrieveUserPosts(userId);
                                    setPosts(Array.isArray(updatedPosts) ? [...updatedPosts].reverse() : []);
                                }}
                                onToggleFavClick={async () => {
                                    const updatedPosts = await retrieveUserPosts(userId);
                                    setPosts(Array.isArray(updatedPosts) ? [...updatedPosts].reverse() : []);
                                }}
                                onDeletePost={async () => {
                                    const updatedPosts = await retrieveUserPosts(userId);
                                    setPosts(Array.isArray(updatedPosts) ? [...updatedPosts].reverse() : []);
                                }}
                                onPostTextUpdate={async () => {
                                    const updatedPosts = await retrieveUserPosts(userId);
                                    setPosts(Array.isArray(updatedPosts) ? [...updatedPosts].reverse() : []);
                                }}
                            />
                        );
                    })
                )}
            </section>
        </div>
    );

}
