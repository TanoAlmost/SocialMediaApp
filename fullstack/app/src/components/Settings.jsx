import { useNavigate } from 'react-router-dom';
import { Button } from '../library';
import ChangeCredentials from './ChangeCredentials';
import logoutUser from '../logic/logoutUser';
import logic from "../logic";
import session from '../logic/session';

export default function Settings() {
    const navigate = useNavigate();

    function handleLogoutClick() {
        // Llamar a la función de logout
        logoutUser((error) => {
            if (error) {
                console.error('Error during logout:', error);
                return;
            }

            console.log('User logged out');
            navigate('/login'); // Redirigir a la página de inicio de sesión
        });
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
        <div className="flex flex-col items-center justify-center gap-6">
            <ChangeCredentials />
            <div className="flex justify-center w-full">
                <Button className="button" onClick={handleLogoutClick}>Logout</Button>
            </div>

            <Button
                className="text-lg text-white bg-transparent border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#5F5784] transition duration-300 ease-in-out mt-4"
                onClick={handleDeleteAccount}
            >
                Delete Account
            </Button>
        </div>
    );
}
