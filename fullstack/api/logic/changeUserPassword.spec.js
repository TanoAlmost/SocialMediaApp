import dotenv from 'dotenv'
dotenv.config()

import bcrypt from 'bcryptjs'

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserPassword from './changeUserPassword.js'
import { User } from '../data/models.js'

import deleteUser from './deleteUser.js'

import { errors } from 'com'
const { NotFoundError, ContentError, CredentialsError } = errors

describe('changeUserPassword', async () => {
    before(async () => await mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(async () => await User.deleteMany())

    it('succeeds on correct data', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPassword = random.password();
        const newPasswordConfirm = newPassword;

        const user = await User.create({ name, email, password: hashedPassword });

        await changeUserPassword(user.id, password, newPassword, newPasswordConfirm); // Cambia a `changeUserPassword`

        const updatedUser = await User.findById(user.id);

        // Verifica que la contraseña se haya cambiado correctamente
        const match = await bcrypt.compare(newPassword, updatedUser.password);
        expect(match).to.equal(true);
    });


    it('fails on non-existing user', async () => {
        const id = new mongoose.Types.ObjectId().toString()

        try {
            await deleteUser(id)
            throw new Error('should not reach this point')
        } catch (error) {
            if (mongoose.isValidObjectId(id)) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            } else {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('user id is not a valid id')
            }
        }
    })

    it('fails on password and its confirmation not matching', async () => {
        const id = new mongoose.Types.ObjectId().toString(); // Asegúrate de usar un ID válido
        const newPassword = random.password();
        const newPasswordConfirm = random.password(); // Diferente del anterior
        const password = random.password();

        try {
            await changeUserPassword(id, newPassword, newPasswordConfirm, password);
            throw new Error('should not reach this point');
        } catch (error) {
            if (newPassword !== newPasswordConfirm) {
                expect(error).to.be.instanceOf(ContentError);
                expect(error.message).to.equal('new password and its confirmation do not match');
            } else {
                expect(error).to.be.instanceOf(ContentError); // Cambia a ContentError
                expect(error.message).to.equal('user id is not a valid id');
            }
        }
    });

    it('fails on wrong password', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const wrongPassword = random.password();
        const newPassword = random.password();
        const newPasswordConfirm = newPassword;

        let hash = await bcrypt.hash(password, 8);

        const user = await User.create({ name, email, password: hash });

        try {
            await changeUserPassword(user.id, wrongPassword, newPassword, newPasswordConfirm);
            throw new Error('should not reach this point');
        } catch (error) {
            expect(error).to.be.instanceOf(CredentialsError);
            expect(error.message).to.equal('wrong password');
        }
    });


    it('fails if the new password is the same as the current one', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();

        let hash = await bcrypt.hash(password, 8);

        const user = await User.create({ name, email, password: hash });

        try {
            await changeUserPassword(user.id, password, password, password); // Intento de cambiar a la misma contraseña
            throw new Error('should not reach this point');
        } catch (error) {
            // Asumiendo que tienes una validación para esto, de lo contrario ajusta según tu lógica
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('the new password must be different from the current one');
        }
    });

    it('ensures changing password does not alter other user fields', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const newPassword = random.password();
        const newPasswordConfirm = newPassword;

        let hash = await bcrypt.hash(password, 8);

        const user = await User.create({ name, email, password: hash });

        await changeUserPassword(user.id, password, newPassword, newPasswordConfirm);

        const updatedUser = await User.findById(user.id);

        expect(updatedUser.name).to.equal(name);
        expect(updatedUser.email).to.equal(email);
        // Confirma que la contraseña ha cambiado.
        const match = await bcrypt.compare(newPassword, updatedUser.password);
        expect(match).to.equal(true);
    });

    it('handles passwords with special characters correctly', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const newPassword = 'New$P@ssw0rd!';
        const newPasswordConfirm = newPassword;

        let hash = await bcrypt.hash(password, 8);

        const user = await User.create({ name, email, password: hash });

        await changeUserPassword(user.id, password, newPassword, newPasswordConfirm);

        const updatedUser = await User.findById(user.id);

        const match = await bcrypt.compare(newPassword, updatedUser.password);
        expect(match).to.equal(true);
    });


    after(() => mongoose.disconnect())
})
