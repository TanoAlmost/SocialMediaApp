import { validate, errors } from 'com'
import { User, Post } from '../data/models.js'

const { SystemError, NotFoundError } = errors

function retrievePosts(userId) {
    validate.id(userId, 'user id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.find()
                .populate('author', 'name')
                .populate('comments.author', 'name')
                .select('-__v')
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        if (post.author && post.author._id) {
                            post.author.id = post.author._id.toString()
                            delete post.author._id
                        }

                        post.likes = (post.likes || []).map(userObjectId => userObjectId.toString())
                        post.liked = post.likes.includes(userId)

                        post.fav = (user.favs || []).some(postObjectId => postObjectId.toString() === post.id)

                        post.comments = (post.comments || []).map(comment => {
                            comment.id = comment._id.toString()
                            delete comment._id

                            if (comment.author && comment.author._id) {
                                comment.author.id = comment.author._id.toString()
                                delete comment.author._id
                            } else if (comment.author) {
                                comment.author = comment.author.toString()
                            }

                            return comment
                        })
                    })

                    return posts
                })
        })
}

export default retrievePosts
