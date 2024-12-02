import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { expect } from 'chai';
import random from './helpers/random.js';

import retrieveUserPosts from './retrieveUserPosts.js';
import { User, Post } from '../data/models.js';
import { errors } from 'com';

const { NotFoundError } = errors;

const { ObjectId } = mongoose.Types;

describe('retrieveUserPosts', () => {
    before(() => mongoose.connect(process.env.TEST_MONGODB_URL));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds on retrieving posts of an existing user', () => {
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
                        return retrieveUserPosts(user1.id, user1.id) // Retrieve posts of user1
                            .then(posts => {
                                expect(posts).to.exist;
                                expect(posts).to.be.instanceOf(Array);
                                expect(posts).to.have.lengthOf(2); // User1 has 2 posts

                                const post1Exists = posts.some(post => {
                                    return post.id === post1.id &&
                                        post.image === post1.image &&
                                        post.text === post1.text &&
                                        post.author.name === user1.name;
                                });

                                expect(post1Exists).to.be.true;

                                const post2Exists = posts.some(post => {
                                    return post.id === post2.id &&
                                        post.image === post2.image &&
                                        post.text === post2.text &&
                                        post.author.name === user1.name;
                                });

                                expect(post2Exists).to.be.true;
                            });
                    });
            });
    });

    it('returns an empty array if the user has no posts', () => {
        return User.create({ name: random.name(), email: random.email(), password: random.password() })
            .then(user => {
                return retrieveUserPosts(user.id, user.id)
                    .then(posts => {
                        expect(posts).to.exist;
                        expect(posts).to.be.instanceOf(Array);
                        expect(posts).to.have.lengthOf(0); // No posts for the user
                    });
            });
    });

    it('fails on non-existing target user', () => {
        const nonExistingUserId = new ObjectId().toString(); // Generar un ObjectId aleatorio

        return retrieveUserPosts(new ObjectId().toString(), nonExistingUserId)
            .then(() => { throw new Error('should not reach this point'); }) // No debe llegar aquí
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError); // Verificar que el error es NotFoundError
                expect(error.message).to.equal('user not found'); // Verificar el mensaje del error
            });
    });

    after(() => mongoose.disconnect());
});
