import { validate } from 'com';
import session from './session';

function logoutUser(callback) {
    try {
        // Validar que el callback sea una función
        validate.function(callback, 'callback');

        // Limpiar los datos de la sesión
        session.token = null;
        session.sessionUserId = null;

        // Llamar al callback sin errores
        callback(null);
    } catch (error) {
        // Llamar al callback con un error si ocurre
        callback(error);
    }
}

export default logoutUser;
