import { User, Post } from '../data/models.js';
import { validate, errors } from 'com';
const { SystemError, NotFoundError } = errors;

function deleteUser(userId) {
    validate.id(userId, 'user id');

    return User.findById(userId).lean()
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found');

            // Eliminar el usuario y sus publicaciones
            return Promise.all([
                User.findByIdAndDelete(userId),
                Post.deleteMany({ author: userId })
            ]);
        })
        .then(([deletedUser, deletedPostsResult]) => {
            if (!deletedUser)
                throw new NotFoundError('user not found after attempting to delete');

            // Opcional: Puedes verificar cuántos posts fueron eliminados
            console.log(`Deleted ${deletedPostsResult.deletedCount} posts of the user.`);

            // Usuario y publicaciones eliminados correctamente
            return; // Retornamos para indicar que la operación se completó
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                throw error; // Re-lanzamos el error para que sea manejado externamente
            } else {
                throw new SystemError(error.message);
            }
        });
}

export default deleteUser;
