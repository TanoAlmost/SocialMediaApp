import getCommentsFromPost from '../logic/getCommentsFromPost.js';

export default function getCommentsHandler(req, res) {
    const { postId } = req.params;

    getCommentsFromPost(postId)
        .then(comments => res.json(comments))
        .catch(error => {
            console.error('Error retrieving comments:', error);
            res.status(error.status || 500).json({ error: error.name, message: error.message });
        });
}
