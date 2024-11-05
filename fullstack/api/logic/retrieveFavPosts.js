import { validate, errors } from 'com'

import { User, Post } from '../data/models.js'

const { SystemError, NotFoundError } = errors

function retrieveFavPosts(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find({ _id: { $in: user.favs } }).populate('author', 'name').select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        post.likes = post.likes.map(userObjectId => userObjectId.toString())
                        post.liked = post.likes.includes(userId)

                        post.fav = user.favs.some(postObjectId => postObjectId.toString() === post.id)
                    })

                    return posts
                })
        })
}

export default retrieveFavPosts