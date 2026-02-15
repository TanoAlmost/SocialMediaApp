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


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log('Fetching user profile for userId:', userId); // Debug
                const userData = await retrieveUserProfile(userId);
                console.log('User profile data:', userData); // Debug

                const userPosts = await retrieveUserPosts(userId);
                console.log('User posts:', userPosts); // Debug

                setUser(userData);
                setPosts(userPosts || []);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);


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
                    posts.map((post) => {
                        // Agregar los console.log aquí para inspeccionar los datos
                        console.log('Post author:', post.author);
                        console.log('Logged in user ID:', loggedInUserId);
                        console.log('Is owner:', post.author && post.author.id === loggedInUserId);

                        return (
                            <Post
                                key={post.id}
                                post={post}
                                isOwner={post.author._id === loggedInUserId}// Verifica si el usuario autenticado es el autor
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
                        );
                    })
                )}
            </section>
        </div>
    );

}
