import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import retrieveUserPosts from '../logic/retrieveUserPosts';

export default function UserPosts() {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        retrieveUserPosts(userId, (error, retrievedPosts) => {
            if (error) {
                console.error('Error retrieving posts:', error);
                setError('An unexpected error occurred'); // Mostrar mensaje genérico si hay error real
                return;
            }

            setPosts(retrievedPosts || []); // Asegurar un array vacío si no hay posts
        });
    }, [userId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (posts.length === 0) {
        return <div>No posts found for this user.</div>; // Mostrar mensaje si no hay posts
    }

    return (
        <div className='post'>
            <h1>User Posts</h1>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <h3>{post.author.name}</h3>
                    <img src={post.image} alt={post.text} style={{ maxWidth: '80%' }} />
                    <p>{post.text}</p>
                    <p>Likes: {post.likes.length}</p>
                    <ul>
                        {post.likes.map((like, index) => (
                            <li key={like.id || `like-${index}`}>
                                {like.name || `User ${index + 1}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
