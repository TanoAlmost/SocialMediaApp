import { useState } from 'react'
import { Button } from '../library'
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { useContext } from "../hooks/"
import changeUserEmail from '../logic/changeUserEmail';
import changeUserPassword from '../logic/changeUserPassword';
import session from "../logic/session"; // Importar session.js
import Context from '../context'
import logo from "../assets/logo-w-wh-s.png"


export default function ChangeCredentials() {
    console.log('ChangeCredentials')


    const navigate = useNavigate(); // Inicializar useNavigate


    // Función para manejar el clic en el botón de volver a configuraciones


    const handleBackToProfile = () => {
        navigate('/profile'); // Asegúrate de que el path coincide con el de tu componente de configuraciones
    };

    const context = useContext(Context)

    function handleChangeEmailSubmit(event) {

        event.preventDefault();

        const newEmail = event.target.querySelector('#new-email-input').value;
        const newEmailConfirm = event.target.querySelector('#new-email-confirm-input').value;
        const password = event.target.querySelector('#password-input').value;


        (async () => {
            try {
                await changeUserEmail(newEmail, newEmailConfirm, password);
                context.handleSuccess('Email changed successfully');
                event.target.reset(); // Limpia el formulario después de un cambio exitoso
            } catch (error) {
                context.handleError(error);
            }
        })();
    }

    function handleChangePasswordSubmit(event) {

        event.preventDefault();

        const password = event.target.querySelector('#password-input').value;
        const newPassword = event.target.querySelector('#new-password-input').value;
        const newPasswordConfirm = event.target.querySelector('#new-password-confirm-input').value;



        (async () => {
            try {
                await changeUserPassword(password, newPassword, newPasswordConfirm);
                context.handleSuccess('Password changed successfully');
                event.target.reset(); // Limpia el formulario después de un cambio exitoso
            } catch (error) {
                context.handleError(error);
            }
        })();
    }


    return <div >


        <div className='flex flex-col items-center justify-center '>

            <h2 className="mt-5 mb-5">Update e-mail</h2>
            <form className="form" onSubmit={handleChangeEmailSubmit}>
                <label htmlFor="new-email-input">New e-mail</label>
                <input className="input" id="new-email-input" type="email" />

                <label htmlFor="new-email-confirm-input">Confirm new e-mail</label>
                <input className="input" id="new-email-confirm-input" type="email" />

                <label htmlFor="password-input">Password</label>
                <input className="input" type="password" id="password-input" />

                <Button type="submit" className="update-button mt-5">Update e-mail</Button>
            </form>

            <h2 className="mt-5 mb-5">Update password</h2>

            <form className="form" onSubmit={handleChangePasswordSubmit}>
                <label htmlFor="password-input">Current password</label>
                <input className="input" type="password" id="password-input" />

                <label htmlFor="new-password-input">New password</label>
                <input className="input" id="new-password-input" type="password" />

                <label htmlFor="new-password-confirm-input">Confirm new password</label>
                <input className="input" id="new-password-confirm-input" type="password" />

                <Button type="submit" className="update-button mt-5">Update password</Button>
            </form>

            {/* <Button className="back-button mt-5" onClick={handleBackToProfile}>Back to Profile</Button> */}
            {/* 
            <footer className="flex justify-center max-w-xs max-h-10 object-contain">
                <img src={logo} alt="Logo" className="logo-register" />

            </footer> */}

        </div>

    </div>
}