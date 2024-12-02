import jwt from 'jsonwebtoken';
import logic from '../logic/index.js';

export default (req, res) => {
    try {
        const token = req.headers.authorization.substring(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { userId: targetUserId } = req.params;

        logic.retrieveUserPosts(userId, targetUserId)
            .then(posts => {
                res.json(posts); // Devolver los posts, incluso si es un array vacío
            })
            .catch(error => {
                console.error('Error retrieving user posts:', error.message);
                res.status(500).json({ error: 'InternalServerError', message: error.message });
            });
    } catch (error) {
        res.status(500).json({ error: 'InternalServerError', message: error.message });
    }
};
