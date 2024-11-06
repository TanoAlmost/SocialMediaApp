import logic from '../logic'

import { Button, Link, Form, Field, Container } from '../library'
import logo from "../assets/logo-w-wh.png"

import { useContext } from '../hooks'

function Login(props) {
    console.log('Login')

    const context = useContext()

    function handleSubmit(event) {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(email, password)
                .then(() => props.onSuccess())
                .catch(error => context.handleError(error))
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <Container className="container-background">

        <img src={logo} alt="Logo" className="logo" />
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="email-input" type="email">E-mail</Field>
            <Field id="password-input" type="password">Password</Field>

            <Button type="submit">Login</Button>

            <p class='paragraph-login'>Ser social significa interactuar, relacionarse y formar conexiones con otras personas, adaptándose y participando
                en el entorno social.
                <br />
                <br />
                Es una parte esencial de la vida humana, ya que desde siempre hemos dependido de la comunidad y la cooperación
                para sobrevivir y prosperar.
                <br />
                <br />
                Ser social también implica ciertas habilidades y comportamientos, como:
                <br />
                Comunicación: Poder expresar y entender ideas, emociones y necesidades.
                <br />
                Empatía: Ser capaz de ponerse en el lugar de otros, entender sus sentimientos y puntos de vista.
                <br />
                <br />
                Adaptabilidad: Ajustarse a diferentes entornos, personas y situaciones sociales.
                <br />
                <br />
                Colaboración: Trabajar junto a otros hacia objetivos comunes.
                <br />
                <br />
                Resolución de conflictos: Saber gestionar y resolver desacuerdos de manera constructiva.
                <br />
                <br />
                Las personas sociales disfrutan y buscan estas interacciones y suelen encontrar energía y satisfacción en las relaciones con otros.
            </p>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </Container>
}

export default Login