import jwt from 'jsonwebtoken'
const { JsonWebTokenError } = jwt

import logic from '../logic/index.js'

import { errors } from 'com'
const { NotFoundError, ContentError, TokenError } = errors

export default (req, res) => {
    try {
        const token = req.headers.authorization.substring(7) // Obtiene el token de la cabecera de autorización
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET) // Verifica el token y extrae el ID del usuario

        const { postId } = req.params // Obtiene el ID del post de los parámetros de la URL

        logic.deletePost(userId, postId)
            .then(() => res.status(204).send()) // Envia un estado 204 sin contenido si la eliminación fue exitosa
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.constructor.name, message: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406
        else if (error instanceof JsonWebTokenError) {
            status = 401
            error = new TokenError(error.message)
        }

        res.status(status).json({ error: error.constructor.name, message: error.message })
    }
}
