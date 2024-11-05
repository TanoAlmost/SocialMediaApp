import { validate } from 'com'

function changeUserPassword(newPassword, newPasswordConfirm, password) {
    validate.password(newPassword, 'new password')
    validate.password(newPasswordConfirm, 'new password confirm')
    validate.password(password)

    // TODO call api
}

export default changeUserPassword