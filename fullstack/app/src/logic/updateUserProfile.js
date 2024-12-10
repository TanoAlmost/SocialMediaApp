import { validate, errors } from 'com';
import session from './session';

async function updateUserProfile(userId, profileData) {
    validate.id(userId, 'userId');
    validate.object(profileData, 'profileData');

    const req = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.token}`, // Asegúrate de que el token es válido
        },
        body: JSON.stringify(profileData),
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, req);

    if (!response.ok) {
        const body = await response.text(); // Cambiado a .text() para depurar errores HTML
        console.error('Server response:', body); // Registra el cuerpo de la respuesta
        throw new Error(`Failed to update user profile: ${response.statusText}`);
    }

    return response.json(); // Devuelve los datos del usuario actualizado
}

export default updateUserProfile;
