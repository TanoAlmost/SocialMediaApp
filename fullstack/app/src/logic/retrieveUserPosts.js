import { validate, errors } from 'com';
import session from './session';

function retrieveUserPosts(userId, callback) {
    validate.id(userId, 'userId');
    validate.function(callback, 'callback');

    const req = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session.token}`
        }
    };

    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`, req)
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .then(body => {
                        const ErrorConstructor = errors[body.error] || Error; // Fallback a Error genérico
                        throw new ErrorConstructor(body.message);
                    });
            }
            return res.json();
        })
        .then(posts => callback(null, posts))
        .catch(error => callback(error));
}

export default retrieveUserPosts;
