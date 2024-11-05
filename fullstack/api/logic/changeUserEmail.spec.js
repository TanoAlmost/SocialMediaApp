import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import changeUserEmail from './changeUserEmail.js'
import { User } from '../data/models.js'

import { errors } from 'com'
const { NotFoundError, ContentError } = errors

describe('changeUserEmail', async () => {
    before(async () => await mongoose.connect(process.env.MONGODB_TEST))

    beforeEach(async () => await User.deleteMany())

    it('succeeds on correct data', async () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()
        const newEmail = random.email()
        const newEmailConfirm = newEmail

        const user = await User.create({ name, email, password })

        await changeUserEmail(user.id, newEmail, newEmailConfirm, user.password)

        const user2 = await User.findById(user.id)

        expect(user2.email).to.equal(newEmail)
    })

    it('fails on non existing user', async () => {
        const id = random.id()
        const newEmail = random.email()
        const newEmailConfirm = newEmail
        const password = random.password()

        try {
            await changeUserEmail(id, newEmail, newEmailConfirm, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on email and its confirmation not matching', async () => {
        const id = random.id()
        const newEmail = random.email()
        const newEmailConfirm = random.email()
        const password = random.password()

        try {
            await changeUserEmail(id, newEmail, newEmailConfirm, password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new email and its confirmation do not match')
        }
    })

    it.skip('fails on wrong password', () => {

    })

    after(() => mongoose.disconnect())
})