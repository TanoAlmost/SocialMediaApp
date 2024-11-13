import { validate, errors } from 'com'
import session from './session'

function deletePost(postId, callback) {
    // Validación del postId
    validate.text(postId, 'postId')

    const req = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        }
    }

    // Realiza la solicitud de eliminación
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, req)
        .then(res => {
            if (!res.ok) {
                res.json()
                    .then(body => callback(new errors[body.error](body.message)))
                    .catch(error => callback(error))

                return
            }

            callback(null) // Llama al callback sin error si se elimina correctamente
        })
        .catch(error => callback(error)) // Maneja errores de la solicitud
}

export default deletePost
