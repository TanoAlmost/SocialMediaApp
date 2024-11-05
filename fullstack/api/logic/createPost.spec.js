import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import createPost from './createPost.js'
import { errors } from 'com'
import { User, Post } from '../data/models.js'

const { NotFoundError } = errors

const { ObjectId } = mongoose.Types

describe('createPost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => User.deleteMany())

    it('succeds on existing user', () => {
        const name = random.name()
        const email = random.email()
        const password = random.password()

        const image = random.image()
        const text = random.text()

        return User.create({ name, email, password })
            .then(user => {
                return createPost(user.id, image, text)
                    .then(value => {
                        expect(value).to.be.undefined

                        return Post.findOne({ author: user.id })
                    })
                    .then(post => {
                        expect(post.image).to.equal(image)
                        expect(post.text).to.equal(text)
                    })
            })
    })

    it('fails on non-existing user', () => {
        const image = random.image()
        const text = random.text()

        return createPost(new ObjectId().toString(), image, text)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => mongoose.disconnect())
})