import { useState } from 'react';
import { Button } from '../library';
import { useNavigate } from 'react-router-dom';
import { useContext } from "../hooks/";
import changeUserEmail from '../logic/changeUserEmail';
import changeUserPassword from '../logic/changeUserPassword';
import Context from '../context';

export default function ChangeCredentials() {
    console.log('ChangeCredentials');

    const navigate = useNavigate();
    const context = useContext(Context);

    // Estados para el formulario de cambiar email
    const [emailData, setEmailData] = useState({
        newEmail: '',
        newEmailConfirm: '',
        password: '',
    });

    // Estados para el formulario de cambiar contraseña
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    async function handleChangeEmailSubmit(event) {
        event.preventDefault();

        const { newEmail, newEmailConfirm, password } = emailData;

        try {
            await changeUserEmail(newEmail, newEmailConfirm, password);
            if (context.handleSuccess) {
                context.handleSuccess('Email changed successfully');
            }
            setEmailData({ newEmail: '', newEmailConfirm: '', password: '' });
        } catch (error) {
            if (context.handleError) {
                context.handleError(error);
            } else {
                console.error(error);
            }
        }
    }

    async function handleChangePasswordSubmit(event) {
        event.preventDefault();

        const { currentPassword, newPassword, newPasswordConfirm } = passwordData;

        try {
            await changeUserPassword(currentPassword, newPassword, newPasswordConfirm);
            if (context.handleSuccess) {
                context.handleSuccess('Password changed successfully');
            }
            setPasswordData({ currentPassword: '', newPassword: '', newPasswordConfirm: '' });
        } catch (error) {
            if (context.handleError) {
                context.handleError(error);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="mt-5 mb-5">Update E-mail</h2>
            <form className="form" onSubmit={handleChangeEmailSubmit}>
                <label htmlFor="new-email">New e-mail</label>
                <input
                    className="input"
                    id="new-email"
                    name="newEmail"
                    type="email"
                    value={emailData.newEmail}
                    onChange={handleEmailChange}
                />

                <label htmlFor="new-email-confirm">Confirm new e-mail</label>
                <input
                    className="input"
                    id="new-email-confirm"
                    name="newEmailConfirm"
                    type="email"
                    value={emailData.newEmailConfirm}
                    onChange={handleEmailChange}
                />

                <label htmlFor="email-password">Password</label>
                <input
                    className="input"
                    id="email-password"
                    name="password"
                    type="password"
                    value={emailData.password}
                    onChange={handleEmailChange}
                />

                <Button type="submit" className="update-button mt-5">
                    Update e-mail
                </Button>
            </form>

            <h2 className="mt-5 mb-5">Update Password</h2>
            <form className="form" onSubmit={handleChangePasswordSubmit}>
                <label htmlFor="current-password">Current password</label>
                <input
                    className="input"
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                />

                <label htmlFor="new-password">New password</label>
                <input
                    className="input"
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                />

                <label htmlFor="new-password-confirm">Confirm new password</label>
                <input
                    className="input"
                    id="new-password-confirm"
                    name="newPasswordConfirm"
                    type="password"
                    value={passwordData.newPasswordConfirm}
                    onChange={handlePasswordChange}
                />

                <Button type="submit" className="update-button mt-5">
                    Update password
                </Button>
            </form>
        </div>
    );
}
