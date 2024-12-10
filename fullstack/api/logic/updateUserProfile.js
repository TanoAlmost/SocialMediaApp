import { User } from '../data/models.js';

function updateUserProfile(targetUserId, profileData) {
    const { profilePicture, bio, status, interests } = profileData;

    return User.findByIdAndUpdate(
        targetUserId,
        { profilePicture, bio, status, interests },
        { new: true } // Devuelve el documento actualizado
    ).lean()
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

export default updateUserProfile;
