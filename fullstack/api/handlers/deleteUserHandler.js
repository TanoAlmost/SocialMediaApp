import jwt from 'jsonwebtoken';

import { errors } from 'com';
const { JsonWebTokenError } = jwt;

import logic from '../logic/index.js';
const { NotFoundError, ContentError, TokenError } = errors;

export default (req, res) => {
    try {
        const { userId } = req.params; // Asumimos que el ID del usuario a eliminar viene en los parámetros de la ruta

        const token = req.headers.authorization.substring(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const requesterId = payload.sub; // ID del usuario que realiza la solicitud

        // Asegurar que el usuario que realiza la solicitud es el mismo que se intenta eliminar, o tiene permisos de administrador
        if (requesterId !== userId) {
            throw new TokenError('User does not have permission to delete this account');
        }

        logic.deleteUser(userId)
            .then(() => res.status(204).send())
            .catch(error => {
                let status = 505;

                if (error instanceof NotFoundError)
                    status = 404;

                res.status(status).json({ error: error.constructor.name, message: error.message });
            });
    } catch (error) {
        let status = 500;

        if (error instanceof ContentError || error instanceof TypeError)
            status = 406;

        if (error instanceof JsonWebTokenError) {
            status = 401;
            error = new TokenError(error.message);
        }

        res.status(status).json({ error: error.constructor.name, message: error.message });
    }
};
