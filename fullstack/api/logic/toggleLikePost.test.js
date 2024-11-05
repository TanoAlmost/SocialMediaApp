import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {

        try {
            toggleLikePost('65849effd6fe566e658c5580', '659c4a0d735c5e851dad76cd')
                .then(() => {
                    console.log('post like toggled')
                })
                .catch(() => {
                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))