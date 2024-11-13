import { validate } from 'com'

import session from "./session"

function logoutUser(callback) {
    validate.function(callback, 'callback')

    session.token = null
    session.sessionUserId = null

    callback(null)
}

export default logoutUser