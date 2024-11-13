import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import updatePostText from './updatePostText.js'

mongoose.connect(process.env.MONGODB_TEST)
    .then(() => {
        try {
            updatePostText('658956f7eed889536efe91d7', '65895deeeed889536efe91dd', '123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('text updated')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))