import { Post } from '../data/models.js';

function getCommentsFromPost(postId) {
    return Post.findById(postId)
        .populate('comments.author', 'name profilePicture') // Cargar detalles del autor
        .then(post => {
            if (!post) throw new Error('Post not found.');
            return post.comments;
        });
}

export default getCommentsFromPost;
