import { validate } from 'com';
import session from './session';

async function addComment(postId, userId, text) {
    validate.id(postId, 'postId'); // Valida el ID del post
    validate.id(userId, 'userId'); // Valida el ID del usuario
    validate.text(text, 'text');  // Cambia a validate.text

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ userId, text }),
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, req);

    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || 'Failed to add comment');
    }

    return response.json();
}

export default addComment;
