import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import { expect } from 'chai'
import random from './helpers/random.js'

import retrieveFavPosts from './retrieveFavPosts.js'
import { User, Post } from '../data/models.js'
import { errors } from 'com'

const { NotFoundError } = errors

const { ObjectId } = mongoose.Types

describe('retrieveFavPosts', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeed on existing user', () => {
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
                        user2.favs.push(post2, post3)

                        return user2.save()
                            .then(user2 => {
                                return retrieveFavPosts(user2.id)
                                    .then(posts => {
                                        expect(posts).to.exist
                                        expect(posts).to.be.instanceOf(Array)
                                        expect(posts).to.have.lengthOf(2)

                                        const post2Exists = posts.some(post => {
                                            return post.id === post2.id && post.image === post2.image && post.text === post2.text && post.fav
                                        })

                                        expect(post2Exists).to.be.true

                                        const post3Exists = posts.some(post => {
                                            return post.id === post3.id && post.image === post3.image && post.text === post3.text && post.fav
                                        })

                                        expect(post3Exists).to.be.true
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        return retrieveFavPosts(new ObjectId().toString())
            .then(posts => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => mongoose.disconnect())
})