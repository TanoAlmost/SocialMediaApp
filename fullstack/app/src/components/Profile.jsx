import logic from "../logic"

import { useContext } from "../hooks"

import { Button } from '../library'

export default function Profile(props) {
    console.log('profile')

    const context = useContext()

    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        const newEmail = event.target.querySelector('#new-email-input').value
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value
        const password = event.target.querySelector('#password-input').value

        return (async () => {
            try {
                await logic.changeUserEmail(newEmail, newEmailConfirm, password)
                props.onSuccess()
                alert('Email changed successfully')
            } catch (error) {
                context.handleError(error)
            }
        })()
    }

    function handleChangePasswordSubmit(event) {
        event.preventDefault()

        const password = event.target.querySelector('#password-input').value
        const newPassword = event.target.querySelector('#new-password-input').value
        const newPasswordConfirm = event.target.querySelector('#new-password-confirm-input').value

        return (async () => {
            try {
                await logic.changeUserPassword(password, newPassword, newPasswordConfirm)
                props.onSuccess()
                alert('Password changed successfully')
            } catch (error) {
                context.handleError(error)
            }
        })()
    }
    return <div className="container">
        <h2>Update e-mail</h2>

        <form className="form" onSubmit={handleChangeEmailSubmit}>
            <label htmlFor="new-email-input">New e-mail</label>
            <input className="input" id="new-email-input" type="email" />

            <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
            <input className="input" id="new-email-confirm-input" type="email" />

            <label htmlFor="password-input">Password</label>
            <input className="input" type="password" id="password-input" />

            <Button type="submit">Update e-mail</Button>
        </form>

        <h2>Update password</h2>

        <form className="form" onSubmit={handleChangePasswordSubmit}>
            <label htmlFor="password-input">Current password</label>
            <input className="input" type="password" id="password-input" />

            <label htmlFor="new-password-input">New password</label>
            <input className="input" id="new-password-input" type="password" />

            <label htmlFor="new-password-confirm-input">Confirm new password</label>
            <input className="input" id="new-password-confirm-input" type="password" />

            <Button type="submit">Update password</Button>
        </form>
    </div>
}