import { validate } from 'com'

import context from "./context"

function logoutUser(callback) {
    validate.function(callback, 'callback')

    context.token = null
    context.sessionUserId = null

    callback(null)
}

export default logoutUser