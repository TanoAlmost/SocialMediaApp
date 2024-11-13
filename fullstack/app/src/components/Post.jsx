import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LikesButton, Button, Form, Field, Link } from '../library'
import { useContext } from '../hooks'

import session from '../logic/session'

import logic from '../logic'


function Post(props) {
    console.log('Post')

    const [view, setView] = useState(null)

    // Usamos sessionUserId desde context
    const sessionUserId = session.sessionUserId;

    const context = useContext()
    const navigate = useNavigate()

    console.log("Session User ID:", session.sessionUserId);
    console.log("Post Author ID:", props.post.author.id);
    console.log("Condition met:", String(session.sessionUserId) === String(props.post.author.id));


    const handleToggleLikeClick = () => {
        try {
            logic.toggleLikePost(props.post.id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onToggleLikeClick()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleToggleFavClick = () => {
        try {
            logic.toggleFavPost(props.post.id, error => {
                if (error) {
                    context.handleError(error)

                    return
                }

                props.onToggleFavClick()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleEditClick = () => setView('edit')

    const handleEditCancelClick = () => setView(null)

    const handleEditSubmit = event => {
        event.preventDefault()
        const text = event.target.text.value

        try {
            logic.updatePostText(props.post.id, text, error => {
                if (error) {
                    context.handleError(error)
                    return
                }

                console.log('Post editado con éxito, actualizando lista de posts') // Confirmación de actualización
                props.onPostTextUpdate()
                setView(null)
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleUserClick = event => {
        event.preventDefault()

        navigate(`/users/${props.post.author.id}`)
    }

    const handleDeleteClick = () => {
        try {
            logic.deletePost(props.post.id, error => {
                if (error) {
                    context.handleError(error) // Maneja cualquier error a través del contexto
                    return
                }

                props.onDeletePost() // Notifica al componente padre que el post fue eliminado
            })
        } catch (error) {
            context.handleError(error) // Captura cualquier error inesperado
        }
    }

    return <article className="post">
        <h2><Link onClick={handleUserClick}>{props.post.author.name}</Link></h2>

        <img className="post-image" src={props.post.image} />

        {view === null && <p>{props.post.text}</p>}

        {view === 'edit' && <Form onSubmit={handleEditSubmit}>
            <Field id="text" value={props.post.text} />
            <Button type="submit">Save</Button>
            <Button onClick={handleEditCancelClick}>Cancel</Button>
        </Form>}

        <div className="post-actions">
            <LikesButton onClick={handleToggleLikeClick}>{props.post.liked ? '❤️' : '🤍'} {props.post.likes.length} likes</LikesButton>
            <Button onClick={handleToggleFavClick}>{props.post.fav ? '⭐️' : '✩'}</Button>

            {sessionUserId === props.post.author.id && view === null && <Button onClick={handleEditClick}>✏️</Button>}

            {sessionUserId === props.post.author.id && (
                <Button onClick={handleDeleteClick}>🗑️ Delete</Button>
            )}


        </div>
    </article>
}

export default Post