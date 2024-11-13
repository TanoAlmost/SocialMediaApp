import jwt from 'jsonwebtoken'
import { errors } from 'com'
import logic from '../logic/index.js'

const { NotFoundError, ContentError, TokenError, SystemError } = errors
const { JsonWebTokenError } = jwt

export default (req, res) => {
    try {
        // Extrae el token de autorización
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new TokenError('Token not provided or invalid format')
        }

        const token = authHeader.substring(7)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.sub

        // Extrae el postId y el nuevo texto del cuerpo de la solicitud
        const { postId } = req.params
        const { text } = req.body

        // Llama a la lógica para actualizar el texto del post
        logic.updatePostText(userId, postId, text)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 500 // Cambiado a 500 para errores internos del servidor

                if (error instanceof NotFoundError) status = 404
                else if (error instanceof ContentError) status = 400 // Cambiado a 400 para errores de contenido

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError) {
            status = 400 // Cambiado a 400 para errores de solicitud incorrecta
        } else if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
