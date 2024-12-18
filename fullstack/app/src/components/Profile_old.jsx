import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

import logic from "../logic";
import session from "../logic/session"; // Importar session.js

import { Button } from "../library";

export default function Profile(props) {
    console.log("profile");

    const navigate = useNavigate(); // Inicializar navigate

    // Estados para los campos del formulario de email
    const [newEmail, setNewEmail] = useState("");
    const [newEmailConfirm, setNewEmailConfirm] = useState("");
    const [password, setPassword] = useState("");

    // Estados para los campos del formulario de password
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    function handleChangeEmailSubmit(event) {
        event.preventDefault();

        return (async () => {
            try {
                await logic.changeUserEmail(newEmail, newEmailConfirm, password);

                if (props.onSuccess) props.onSuccess();

                alert("Email changed successfully");

                // Resetear los valores de estado para vaciar los inputs
                setNewEmail("");
                setNewEmailConfirm("");
                setPassword("");
            } catch (error) {
                console.error(error);
            }
        })();
    }

    function handleChangePasswordSubmit(event) {
        event.preventDefault();

        return (async () => {
            try {
                await logic.changeUserPassword(currentPassword, newPassword, newPasswordConfirm);

                if (props.onSuccess) props.onSuccess();

                alert("Password changed successfully");

                // Resetear los valores de estado para vaciar los inputs
                setCurrentPassword("");
                setNewPassword("");
                setNewPasswordConfirm("");
            } catch (error) {
                console.error(error);
            }
        })();
    }

    async function handleDeleteAccount() {
        if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

        try {
            const userId = session.sessionUserId; // Obtener el userId directamente desde session.js
            if (!userId) {
                throw new Error("User ID is undefined. Unable to delete account.");
            }

            console.log("Attempting to delete user with ID:", userId);

            await logic.deleteUser(userId);

            logic.logoutUser(() => {
                console.log("User logged out. Redirecting to /register...");
                navigate("/register");
            });

            alert("Your account has been deleted successfully.");

        } catch (error) {
            console.error("Error during account deletion:", error);
        }
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

            <Button
                className="text-lg text-white bg-transparent border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#5F5784] transition duration-300 ease-in-out mt-4"
                onClick={handleDeleteAccount}
            >
                Delete Account
            </Button>
        </div>
    );
}
