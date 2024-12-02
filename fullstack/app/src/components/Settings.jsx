import { useNavigate } from 'react-router-dom';
import { Button } from '../library';
import ChangeCredentials from './ChangeCredentials';
import logoutUser from '../logic/logoutUser';

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

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <ChangeCredentials />
            <div className="flex justify-center w-full">
                <Button className="button" onClick={handleLogoutClick}>Logout</Button>
            </div>
        </div>
    );
}
