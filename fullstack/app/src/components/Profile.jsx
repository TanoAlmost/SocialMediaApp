import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import retrieveUserProfile from '../logic/retrieveUserProfile';
import retrieveUserPosts from '../logic/retrieveUserPosts';
import updateUserProfile from '../logic/updateUserProfile';
import UserInfo from './UserInfo';
import EditUserInfo from './EditUserInfo';
import session from '../logic/session'; // Importar la sesión
import Post from './Post'; // Importar el componente Post

export default function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loggedInUserId = session.sessionUserId; // ID del usuario autenticado
    const isOwner = userId === loggedInUserId; // Verifica si el perfil pertenece al usuario autenticado

    // Cargar la información del usuario y los posts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = await retrieveUserProfile(userId);
                const userPosts = await retrieveUserPosts(userId);
                setUser(userData);
                setPosts(userPosts || []);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]); // `userId` como dependencia garantiza que cambie el conteni

    // Manejar la actualización del perfil
    const handleSave = async (profileData) => {
        try {
            await updateUserProfile(userId, profileData);

            const updatedUser = await retrieveUserProfile(userId);
            const userPosts = await retrieveUserPosts(userId);

            setUser(updatedUser);
            setPosts(userPosts || []);
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
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            isOwner={isOwner}
                            onToggleLikeClick={async () => {
                                const updatedPosts = await retrieveUserPosts(userId);
                                setPosts(updatedPosts);
                            }}
                            onToggleFavClick={async () => {
                                const updatedPosts = await retrieveUserPosts(userId);
                                setPosts(updatedPosts);
                            }}
                            onDeletePost={async () => {
                                const updatedPosts = await retrieveUserPosts(userId);
                                setPosts(updatedPosts);
                            }}
                            onPostTextUpdate={async () => {
                                const updatedPosts = await retrieveUserPosts(userId);
                                setPosts(updatedPosts);
                            }}
                        />
                    ))
                )}
            </section>
        </div>
    );
}
