import bcrypt from 'bcryptjs'

import { User } from '../data/models.js'
import { validate, errors } from 'com'
const { NotFoundError, CredentialsError, ContentError, SystemError } = errors

function changeUserEmail(userId, newEmail, newEmailConfirm, password) {
    validate.id(userId, 'user id')
    validate.email(newEmail, 'new email')
    validate.email(newEmailConfirm, 'new email confirmation')
    validate.password(password)

    if (newEmail !== newEmailConfirm)
        throw new ContentError('new email and its confirmation do not match')

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user)
            throw new NotFoundError('user not found')

        let match
        try {
            match = await bcrypt.compare(password, user.password)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!match)
            throw new CredentialsError('wrong password')

        user.email = newEmail

        try {
            await user.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}

export default changeUserEmail