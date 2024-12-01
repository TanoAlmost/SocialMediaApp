import { useState } from "react"
import logic from "../logic"
import { useContext } from "../hooks"
import { Button } from '../library'

export default function Profile(props) {
    console.log('profile')

    const context = useContext()

    // Estados para los campos del formulario de email
    const [newEmail, setNewEmail] = useState('')
    const [newEmailConfirm, setNewEmailConfirm] = useState('')
    const [password, setPassword] = useState('')

    // Estados para los campos del formulario de password
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

    function handleChangeEmailSubmit(event) {
        event.preventDefault()

        return (async () => {
            try {
                await logic.changeUserEmail(newEmail, newEmailConfirm, password)

                if (props.onSuccess) props.onSuccess()

                alert('Email changed successfully')

                // Resetear los valores de estado para vaciar los inputs
                setNewEmail('')
                setNewEmailConfirm('')
                setPassword('')
            } catch (error) {
                context.handleError(error)
            }
        })()
    }

    function handleChangePasswordSubmit(event) {
        event.preventDefault()

        return (async () => {
            try {
                await logic.changeUserPassword(currentPassword, newPassword, newPasswordConfirm)

                if (props.onSuccess) props.onSuccess()

                alert('Password changed successfully')

                // Resetear los valores de estado para vaciar los inputs
                setCurrentPassword('')
                setNewPassword('')
                setNewPasswordConfirm('')
            } catch (error) {
                context.handleError(error)
            }
        })()
    }

    return (
        <div className="container">
            <h2>Update e-mail</h2>

            <form className="form" onSubmit={handleChangeEmailSubmit}>
                <label className="label" htmlFor="new-email-input">New e-mail</label>
                <input
                    className="input"
                    id="new-email-input"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />

                <label className="label" htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                <input
                    className="input"
                    id="new-email-confirm-input"
                    type="email"
                    value={newEmailConfirm}
                    onChange={(e) => setNewEmailConfirm(e.target.value)}
                />

                <label className="label" htmlFor="email-password-input">Password</label>
                <input
                    className="input"
                    type="password"
                    id="email-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit">Update e-mail</Button>
            </form>

            <h2>Update password</h2>

            <form className="form" onSubmit={handleChangePasswordSubmit}>
                <label className="label" htmlFor="password-current-input">Current password</label>
                <input
                    className="input"
                    type="password"
                    id="password-current-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label className="label" htmlFor="new-password-input">New password</label>
                <input
                    className="input"
                    id="new-password-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="label" htmlFor="new-password-confirm-input">Confirm new password</label>
                <input
                    className="input"
                    id="new-password-confirm-input"
                    type="password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />

                <Button type="submit">Update password</Button>



            </form>

            <Button className="text-lg text-white bg-transparent border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#5F5784] transition duration-300 ease-in-out mt-4" >
                Delete Account
            </Button>

        </div>
    )
}
