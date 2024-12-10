import { User } from '../data/models.js';

function retrieveUserProfile(targetUserId) {
    return User.findById(targetUserId).lean()
        .then(user => {
            if (!user) throw new Error('User not found');

            return {
                id: user._id.toString(),
                name: user.name,
                profilePicture: user.profilePicture,
                bio: user.bio,
                status: user.status,
                interests: user.interests,
            };
        });
}

export default retrieveUserProfile;
