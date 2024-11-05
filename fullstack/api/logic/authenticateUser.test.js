import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')

    try {
        const userId = await authenticateUser('le@mon.com', '123123123')

        console.log('user authenticated', userId)
    } catch (error) {
        console.log(error)
    }
})()