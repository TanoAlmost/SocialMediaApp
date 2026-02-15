import { User, Post } from '../data/models.js';
import { validate, errors } from 'com';
const { SystemError, NotFoundError } = errors;

function deleteUser(userId) {
    validate.id(userId, 'user id');

    return User.findById(userId).lean()
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found');

            const ObjectId = Post.db.base.Types.ObjectId;
            const idObj = new ObjectId(userId);

            // Eliminar el usuario y sus publicaciones
            return Promise.all([
                User.findByIdAndDelete(userId),
                Post.deleteMany({ author: userId }),
                Post.updateMany(
                    { 'comments.author': userId },
                    { $pull: { comments: { author: userId } } }
                ),
                Post.updateMany(
                    { likes: { $in: [idObj, userId] } },
                    { $pull: { likes: { $in: [idObj, userId] } } }
                )
            ]);
        })
        .then(([deletedUser, deletedPostsResult]) => {
            if (!deletedUser)
                throw new NotFoundError('user not found after attempting to delete');

            console.log(`Deleted ${deletedPostsResult.deletedCount} posts of the user.`);

            return;
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new SystemError(error.message);
            }
        });
}

export default deleteUser;
