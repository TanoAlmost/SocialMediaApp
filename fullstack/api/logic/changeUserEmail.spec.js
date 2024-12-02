import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';
import { expect } from 'chai';
import random from './helpers/random.js';

import changeUserEmail from './changeUserEmail.js';
import { User } from '../data/models.js';

import { errors } from 'com';
const { NotFoundError, ContentError } = errors;

describe('changeUserEmail', () => {
    before(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URL);
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    it('succeeds on correct data', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña
        const newEmail = random.email();
        const newEmailConfirm = newEmail;

        const user = await User.create({ name, email, password: hashedPassword }); // Guarda el hash

        await changeUserEmail(user.id, newEmail, newEmailConfirm, password); // Proporciona la contraseña original

        const user2 = await User.findById(user.id);

        expect(user2.email).to.equal(newEmail);
    });
    it('fails on non-existing user', async () => {
        const id = new mongoose.Types.ObjectId().toString() // Genera un ID válido pero inexistente
        const newEmail = random.email()
        const newEmailConfirm = newEmail
        const password = random.password()

        try {
            await changeUserEmail(id, newEmail, newEmailConfirm, password)
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

    it('fails on email and its confirmation not matching', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const newEmail = random.email();
        const newEmailConfirm = random.email();

        const user = await User.create({ name, email, password });

        try {
            await changeUserEmail(user.id, newEmail, newEmailConfirm, password);
            throw new Error('should not reach this point');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('new email and its confirmation do not match');
        }
    });

    it('fails on wrong password', async () => {
        const name = random.name();
        const email = random.email();
        const password = random.password();
        const wrongPassword = random.password();
        const newEmail = random.email();
        const newEmailConfirm = newEmail;

        const user = await User.create({ name, email, password });

        try {
            await changeUserEmail(user.id, newEmail, newEmailConfirm, wrongPassword);
            throw new Error('should not reach this point');
        } catch (error) {
            expect(error).to.be.instanceOf(errors.CredentialsError); // Cambiado de ContentError
            expect(error.message).to.equal('wrong password');
        }
    });


    after(async () => {
        await mongoose.disconnect();
    });
});
