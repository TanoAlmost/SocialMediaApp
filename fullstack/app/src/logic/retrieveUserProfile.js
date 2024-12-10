import { validate, errors } from 'com';
import session from './session';

async function retrieveUserProfile(userId) {
    validate.id(userId, 'userId');

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, req);

    if (!response.ok) {
        const body = await response.json();
        const ErrorConstructor = errors[body.error] || Error; // Fallback a Error genérico
        throw new ErrorConstructor(body.message);
    }

    return response.json(); // Devuelve el perfil de usuario
}

export default retrieveUserProfile;
