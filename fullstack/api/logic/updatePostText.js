import { Post, User } from '../data/models.js'
import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors


function updatePostText(userId, postId, text) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError('Post not found')

                    post.text = text

                    return post.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default updatePostText;