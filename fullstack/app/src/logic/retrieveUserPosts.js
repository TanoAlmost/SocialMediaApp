import { validate, errors } from 'com';
import session from './session';

async function retrieveUserPosts(userId) {
    validate.id(userId, 'userId');

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`, req);

    if (!response.ok) {
        const body = await response.json();
        const ErrorConstructor = errors[body.error] || Error; // Fallback a Error genérico
        throw new ErrorConstructor(body.message);
    }

    return response.json(); // Devuelve el resultado como una Promesa
}

export default retrieveUserPosts;
