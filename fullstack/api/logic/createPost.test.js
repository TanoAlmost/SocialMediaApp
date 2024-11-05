import mongoose from 'mongoose'

import createPost from './createPost.js'
import { User } from '../data/models.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    // .then(() => User.deleteMany())
    // .then(() => User.create({ name: 'Peter Pan', email: 'peter@pan.com', password: '123123123' }))
    .then(user => {
        try {
            // createPost(user.id, 'https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=', 'what a fresh day')
            createPost('65aeb77a9583199bf5fd6d99', 'https://media.istockphoto.com/id/181072765/es/foto/lechuga-aislado.jpg?s=612x612&w=0&k=20&c=7spdLdTK_iyTUdpdp6cjdHkDE9dCkahoTtnOvQYY8mE=', 'what a fresh day')
                .then(() => console.log('created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))