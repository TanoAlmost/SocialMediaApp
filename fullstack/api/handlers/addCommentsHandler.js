import addCommentToPost from '../logic/addCommentToPost.js';

export default function addCommentHandler(req, res) {
    console.log('Received POST request to add comment'); // Log inicial
    console.log('Request Params:', req.params); // Verificar el postId
    console.log('Request Body:', req.body); // Verificar userId y text

    const { postId } = req.params;
    const { userId, text } = req.body;

    addCommentToPost(postId, userId, text)
        .then((comment) => {
            console.log('Comment added successfully:', comment); // Confirmar que se añadió el comentario
            res.status(201).json(comment);
        })
        .catch((error) => {
            console.error('Error adding comment:', error);
            res.status(500).json({ error: error.name, message: error.message });
        });
}
