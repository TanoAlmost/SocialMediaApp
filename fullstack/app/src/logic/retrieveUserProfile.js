import { validate, errors } from 'com';
import session from './session';

async function retrieveUserProfile(userId) {
    validate.id(userId, 'userId');

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`, // Asegúrate de que el token es válido
        },
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, req);

    if (!response.ok) {
        const body = await response.text(); // Cambiado a .text() para depurar errores HTML
        console.error('Server response:', body); // Registra el cuerpo de la respuesta
        throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    return response.json(); // Devuelve los datos en formato JSON
}

export default retrieveUserProfile;

