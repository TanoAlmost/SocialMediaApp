import session from './session'
import { validate, errors } from 'com'
const { SystemError } = errors

function updatePostText(postId, text, callback) {
    // Validación de entradas
    validate.id(postId, 'post id')
    validate.text(text, 'text')

    const req = {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${session.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    }

    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/text`, req)
        .then(res => res.ok ? res : res.json().then(body => Promise.reject(body)))
        .then(() => callback(null)) // Llamada a callback sin errores
        .catch(error => {
            const customError = error && error.error && errors[error.error]
                ? new errors[error.error](error.message)
                : new SystemError(error.message || 'Error updating post text')

            callback(customError)
        })
}

export default updatePostText
