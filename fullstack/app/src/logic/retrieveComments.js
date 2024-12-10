import { validate } from 'com';
import session from './session';

async function retrieveComments(postId) {
    validate.id(postId, 'postId');

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`, // Asegúrate de que el token sea válido
        },
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, req);

    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || 'Failed to retrieve comments');
    }

    return response.json(); // Devuelve la lista de comentarios
}

export default retrieveComments;
