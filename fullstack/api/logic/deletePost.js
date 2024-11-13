import { validate, errors } from 'com'

import { User, Post } from '../data/models.js'

const { SystemError, NotFoundError, ForbiddenError } = errors

function deletePost(userId, postId) {
    validate.id(userId, 'user id')
    validate.id(postId, 'post id')

    return Post.findById(postId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(post => {
            if (!post)
                throw new NotFoundError('post not found')

            if (post.author.toString() !== userId)
                throw new ForbiddenError('user is not the author of the post')

            return Post.findByIdAndDelete(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(() => { })
}

export default deletePost
