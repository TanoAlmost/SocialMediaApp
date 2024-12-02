import { validate, errors } from 'com';
import { Post, User } from '../data/models.js';

const { NotFoundError } = errors;

function retrieveUserPosts(userId, targetUserId) {
    validate.id(userId, 'userId');
    validate.id(targetUserId, 'targetUserId');

    return User.findById(targetUserId).lean() // Verifica si el usuario existe
        .then(user => {
            if (!user) throw new NotFoundError('user not found');

            return Post.find({ author: targetUserId })
                .populate('author', 'name')
                .populate('likes', 'name')
                .lean();
        })
        .then(posts => {
            // Si no hay publicaciones, devuelve un array vacío
            return posts.map(post => ({
                id: post._id.toString(),
                author: post.author,
                image: post.image,
                text: post.text,
                likes: post.likes.map(user => ({
                    id: user._id.toString(),
                    name: user.name
                })),
                liked: post.likes.some(like => like._id.toString() === userId)
            }));
        });
}

export default retrieveUserPosts;
