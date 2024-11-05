import { validate, errors } from 'com'

function updatePostText(postId, text, callback) {
    validate.text(postId, 'post id')
    validate.text(text, 'text')

    // TODO call api
}

export default updatePostText