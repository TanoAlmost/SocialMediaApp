import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeUserEmail from './changeUserEmail.js'

(async () => {
    await mongoose.connect(process.env.MONGODB_TEST)

    try {
        await changeUserEmail('65ba85a56ea740cc2507da53', 'ma@zorca3.com', 'ma@zorca3.com', 'password-0.042824396690471556')
        console.log('email changed')
    } catch (error) {
        console.error(error)
    }
})()