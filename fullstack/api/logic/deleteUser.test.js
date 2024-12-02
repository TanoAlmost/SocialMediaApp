import mongoose from 'mongoose';

import deleteUser from './deleteUser.js'; // Asegúrate de que esta ruta sea correcta
import { User } from '../data/models.js';

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'John Doe', email: 'john@doe.com', password: 'password123' }))
    .then(user => {
        try {
            console.log(`Creating user: ${user.email}`);
            deleteUser(user.id)
                .then(() => {
                    console.log('User deleted');
                    // Opcionalmente, verifica si el usuario fue realmente eliminado
                    return User.findById(user.id);
                })
                .then(foundUser => {
                    console.log('Checking if user still exists...');
                    if (!foundUser) {
                        console.log('User successfully deleted.');
                    } else {
                        console.log('User was not deleted.');
                    }
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error);
        }
    })
    .catch(error => console.error(error));
