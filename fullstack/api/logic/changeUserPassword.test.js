import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import changeUserPassword from './changeUserPassword.js'

(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URL)

    try {
        await changeUserPassword('660379bca28f8799b4cff129', '123123123', '234234234', '234234234')
        console.log('password changed')
    } catch (error) {
        console.error(error)
    }
})()
