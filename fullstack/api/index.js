import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    changeUserEmailHandler,
    changeUserPasswordHandler,
    deleteUserHandler,

    retrievePostsHandler,
    createPostHandler,

    toggleLikePostHandler,
    toggleFavPostHandler,
    retrieveFavPostsHandler,

    deletePostHandler,
    updatePostTextHandler
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const server = express()

        server.get('/', (req, res) => res.send('Hello, my api!'))

        const jsonBodyParser = express.json()

        server.use(cors())

        server.post('/users', jsonBodyParser, registerUserHandler)

        server.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        server.get('/users', retrieveUserHandler)

        server.patch('/users/email', jsonBodyParser, changeUserEmailHandler)

        server.patch('/users/password', jsonBodyParser, changeUserPasswordHandler)

        server.delete('/users/:userId', jsonBodyParser, deleteUserHandler);

        server.get('/posts', retrievePostsHandler)

        server.post('/posts', jsonBodyParser, createPostHandler)

        server.patch('/posts/:postId/likes', toggleLikePostHandler)

        server.patch('/posts/:postId/favs', toggleFavPostHandler)

        server.get('/posts/favs', retrieveFavPostsHandler)

        server.patch('/posts/:postId/text', jsonBodyParser, updatePostTextHandler)

        // Agrega la ruta DELETE para eliminar un post
        server.delete('/posts/:postId', deletePostHandler)

        server.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))
    })
    .catch(error => console.error(error))