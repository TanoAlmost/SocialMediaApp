import jwt from 'jsonwebtoken';
import { User } from '../data/models.js';

const updateUserProfileHandler = async (req, res) => {
    const { userId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const { sub: authenticatedUserId } = jwt.verify(token, process.env.JWT_SECRET);

        if (authenticatedUserId !== userId) {
            return res.status(403).json({ error: 'Unauthorized', message: 'You cannot edit another user\'s profile.' });
        }

        const { profilePicture, status, interests, bio } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { profilePicture, status, interests, bio },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'InternalServerError', message: error.message });
    }
};

export default updateUserProfileHandler;
