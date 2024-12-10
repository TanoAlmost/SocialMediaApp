import retrieveUserProfile from '../logic/retrieveUserProfile.js';

export default function retrieveUserProfileHandler(req, res) {
    const { userId: targetUserId } = req.params;

    retrieveUserProfile(targetUserId)
        .then(profile => {
            if (!profile) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(profile);
            }
        })
        .catch(error => {
            console.error('Error retrieving user profile:', error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        });
}
