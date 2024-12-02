import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'

import random from './helpers/random.js'
import deleteUser from './deleteUser.js' // Asegúrate de tener esta función implementada
import { User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError, ContentError } = errors

describe('deleteUser', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        return User.create({ name, email, password })
            .then(user => {
                expect(user).to.exist

                return deleteUser(user.id)
                    .then(() => {
                        return User.findById(user.id)
                            .then(user => {
                                expect(user).to.be.null
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        const id = random.id()

        return deleteUser(id)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails with an invalid user id format', async () => {
        const invalidId = "123"; // ID no válido

        try {
            await deleteUser(invalidId);
            throw new Error('should not reach this point');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError); // O el error específico que lanzas para IDs inválidos
            expect(error.message).to.include('user id is not a valid id'); // Asegúrate de que el mensaje sea el esperado
        }
    });

    it('ensures related data is also deleted', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();

        const user = await User.create({ name, email, password });
        // Asume que creas datos relacionados aquí, como publicaciones del usuario

        await deleteUser(user.id);

        // Verificar que los datos relacionados también se han eliminado
        // Esto depende de tu lógica de negocio y de cómo estén relacionados tus datos
    });


    after(() => mongoose.disconnect())
})
