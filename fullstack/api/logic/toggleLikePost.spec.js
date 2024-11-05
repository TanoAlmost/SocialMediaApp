import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import toggleLikePost from './toggleLikePost.js'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError } = errors

const { ObjectId } = mongoose.Types

describe('toggleLikePost', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeed on existing user and post', () => {
        return Promise.all([
            User.create({ name: random.name(), email: random.email(), password: random.password() }),
            User.create({ name: random.name(), email: random.email(), password: random.password() })
        ])
            .then(([user1, user2]) => {
                return Promise.all([
                    Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                    Post.create({ author: user1.id, image: random.image(), text: random.text() }),
                    Post.create({ author: user2.id, image: random.image(), text: random.text() })
                ])
                    .then(([post1, post2, post3]) => {
                        return toggleLikePost(user1.id, post3.id)
                            .then(value => {
                                expect(value).to.be.undefined

                                return Post.findById(post3.id)
                                    .then(post3 => {
                                        const userIdExists = post3.likes.some(userObjectId => userObjectId.toString() === user1.id)

                                        expect(userIdExists).to.be.true
                                    })
                            })
                            .then(() => {
                                return toggleLikePost(user1.id, post3.id)
                                    .then(value => {
                                        expect(value).to.be.undefined

                                        return Post.findById(post3.id)
                                            .then(post3 => {
                                                const userIdExists = post3.likes.some(userObjectId => userObjectId.toString() === user1.id)

                                                expect(userIdExists).to.be.false
                                            })
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        return toggleLikePost(new ObjectId().toString(), new ObjectId().toString())
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but no post', () => {
        return Promise.all([
            User.create({ name: random.name(), email: random.email(), password: random.password() }),
            User.create({ name: random.name(), email: random.email(), password: random.password() })
        ])
            .then(([user1, user2]) => {
                return toggleLikePost(user2.id, new ObjectId().toString())
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('post not found')
                    })
            })
    })

    after(() => mongoose.disconnect())
})