import { User } from '../data/models.js';
import { validate, errors } from 'com';

const { NotFoundError } = errors;

function retrieveUserProfile(targetUserId) {
    validate.id(targetUserId, 'targetUserId');

    return User.findById(targetUserId).lean()
        .then(user => {
            if (!user) {
                console.error('User not found:', targetUserId); // Log adicional
                throw new NotFoundError('User not found');
            }

            return {
                id: user._id.toString(),
                name: user.name,
                profilePicture: user.profilePicture || '',
                bio: user.bio || '',
                status: user.status || '',
                interests: user.interests || [],
            };
        });

}

export default retrieveUserProfile;
