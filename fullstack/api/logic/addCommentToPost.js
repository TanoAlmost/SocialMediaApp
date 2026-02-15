import { Post } from '../data/models.js';

function addCommentToPost(postId, userId, text) {
    console.log('addCommentToPost called with:', { postId, userId, text });

    if (!text.trim()) {
        console.error('Comment text is required.');
        throw new Error('Comment text is required.');
    }

    return Post.findById(postId)
        .then((post) => {
            if (!post) {
                console.error('Post not found.');
                throw new Error('Post not found.');
            }

            const ObjectId = Post.db.base.Types.ObjectId; // 👈 viene de mongoose, pero a través del model
            const comment = { author: new ObjectId(userId), text, createdAt: new Date() };

            console.log('Adding comment:', comment);

            post.comments.push(comment);
            return post.save().then(() => {
                console.log('Post saved successfully with new comment.');
                return comment;
            });
        })
        .catch((error) => {
            console.error('Error in addCommentToPost:', error);
            throw error;
        });
}

export default addCommentToPost;
