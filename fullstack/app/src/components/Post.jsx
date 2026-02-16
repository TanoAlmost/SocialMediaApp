import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LikesButton, Button, Form, Field, Link } from '../library';
import { useContext } from '../hooks';

import session from '../logic/session';
import logic from '../logic';

function Post(props) {
    console.log('Post');

    const [view, setView] = useState(null);
    const [comments, setComments] = useState([]); // Estado para los comentarios
    const [newComment, setNewComment] = useState(''); // Estado para el nuevo comentario
    const [loadingComments, setLoadingComments] = useState(true);


    const sessionUserId = session.sessionUserId;

    const context = useContext();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false

        const fetchComments = async () => {
            console.log('Fetching comments for post:', props.post.id)

            try {
                const comments = await logic.retrieveComments(props.post.id)

                if (!cancelled) {
                    setComments(comments)
                }

            } catch (error) {
                console.error('Error fetching comments:', error)
                context.handleError(error)
            } finally {
                if (!cancelled) {
                    setLoadingComments(false)
                }
            }
        }

        // Primera carga
        fetchComments()

        // Polling cada 3s
        const intervalId = setInterval(() => {
            fetchComments()
        }, 3000)

        // Cleanup
        return () => {
            cancelled = true
            clearInterval(intervalId)
        }

    }, [props.post.id])




    const handleAddComment = async (event) => {
        event.preventDefault();

        if (!newComment || !newComment.trim()) {
            console.error('Comment text is empty.'); // Log para depuración
            return;
        }

        try {
            const comment = await logic.addComment(props.post.id, sessionUserId, newComment.trim());
            setComments((prevComments) => [...prevComments, comment]); // Añade el comentario al estado
            setNewComment(''); // Limpia el campo de entrada
        } catch (error) {
            console.error('Error adding comment:', error); // Log de error
            context.handleError(error);
        }
    };


    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(props.post.id, (error) => {
                if (error) {
                    context.handleError(error);
                    return;
                }

                props.onToggleLikeClick();
            });
        } catch (error) {
            context.handleError(error);
        }
    };

    const handleToggleFavClick = () => {
        try {
            logic.toggleFavPost(props.post.id, (error) => {
                if (error) {
                    context.handleError(error);
                    return;
                }

                props.onToggleFavClick();
            });
        } catch (error) {
            context.handleError(error);
        }
    };

    const handleEditClick = () => setView('edit');

    const handleEditCancelClick = () => setView(null);

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const text = event.target.text.value;

        try {
            logic.updatePostText(props.post.id, text, (error) => {
                if (error) {
                    context.handleError(error);
                    return;
                }

                console.log('Post editado con éxito, actualizando lista de posts');
                props.onPostTextUpdate();
                setView(null);
            });
        } catch (error) {
            context.handleError(error);
        }
    };

    const handleUserClick = (event) => {
        event.preventDefault();

        navigate(`/users/${props.post.author.id}`);
    };

    const handleDeleteClick = () => {
        try {
            logic.deletePost(props.post.id, (error) => {
                if (error) {
                    context.handleError(error);
                    return;
                }

                props.onDeletePost(); // Notifica al componente padre que el post fue eliminado
            });
        } catch (error) {
            context.handleError(error);
        }
    };

    return (
        <article className="post">
            <h2>
                <Link onClick={handleUserClick}>{props.post.author.name}</Link>
            </h2>

            <img className="post-image" src={props.post.image} alt="Post" />

            {view === null && <p>{props.post.text}</p>}

            {view === 'edit' && (
                <Form onSubmit={handleEditSubmit}>
                    <Field id="text" defaultValue={props.post.text} />
                    <Button type="submit">Save</Button>
                    <Button onClick={handleEditCancelClick}>Cancel</Button>
                </Form>
            )}

            <div className="post-actions">
                <LikesButton onClick={handleToggleLikeClick}>
                    {props.post.liked ? '❤️' : '🤍'} {props.post.likes.length} likes
                </LikesButton>
                <Button onClick={handleToggleFavClick}>
                    {props.post.fav ? '⭐️' : '✩'}
                </Button>

                {sessionUserId === props.post.author.id && view === null && (
                    <Button onClick={handleEditClick}>✏️</Button>
                )}

                {sessionUserId === props.post.author.id && (
                    <Button onClick={handleDeleteClick}>🗑️ Delete</Button>
                )}
            </div>

            {/* Sección de comentarios */}
            <section className="comments">
                <h3>Comments</h3>
                {loadingComments ? (
                    <p>Loading comments...</p>
                ) : comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.author.name}:</strong>
                            <p>{comment.text}</p>
                        </div>
                    ))
                )}

                {/* Formulario para añadir comentarios */}
                <form onSubmit={handleAddComment}>
                    <Field
                        id="comment"
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)} // Actualiza el estado
                    />
                    <Button type="submit">Add Comment</Button>
                </form>
            </section>
        </article>
    );
}

export default Post;
