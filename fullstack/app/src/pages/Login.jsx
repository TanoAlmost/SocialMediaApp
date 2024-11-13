import logic from '../logic'

import { Button, Link, Form, Field, Container } from '../library'
import logo from "../assets/logo-w-wh-s.png"

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

        <img src={logo} alt="Logo" className="logo-login" />
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="email-input" type="email">E-mail</Field>
            <Field id="password-input" type="password">Password</Field>

            <Button type="submit">Login</Button>

            <div class="scrollable-container">
                <p class="paragraph-login">

                    En TheOnlyGoodSystem Social SocialNetwork, creemos que ser social va más allá de compartir momentos; significa interactuar de manera auténtica, construir relaciones genuinas y formar conexiones significativas con los demás.
                    <br /><br />
                    Nuestra plataforma está diseñada para fomentar un entorno social en el que cada persona pueda adaptarse, participar y sentirse parte de una comunidad.
                    <br /><br />
                    Ser social es una parte esencial de la vida humana. Desde los inicios, hemos dependido de la comunidad y la cooperación para sobrevivir y prosperar. En Social SocialNetwork, rescatamos ese espíritu de colaboración y apoyo mutuo, brindándote un espacio donde cada interacción tiene el potencial de enriquecer y fortalecer tus lazos personales.
                    <br /><br />
                    Nuestra red promueve habilidades y comportamientos clave para una convivencia positiva:
                    <br /><br />
                    <strong>Comunicación:</strong> Queremos que puedas expresar y entender ideas, emociones y necesidades de manera clara y sincera.
                    <br /><br />
                    <strong>Empatía:</strong> Facilitamos espacios donde puedas ponerte en el lugar de otros, comprender sus puntos de vista y sentir con ellos.
                    <br /><br />
                    <strong>Adaptabilidad:</strong> La vida es dinámica y en Social SocialNetwork podrás ajustarte a distintos entornos y situaciones sociales, relacionándote con personas diversas.
                    <br /><br />
                    <strong>Colaboración:</strong> Aquí podrás trabajar junto a otros hacia metas comunes, impulsando proyectos, ideas y momentos compartidos.
                    <br /><br />
                    <strong>Resolución de conflictos:</strong> Aprender a gestionar y resolver desacuerdos de manera constructiva es parte fundamental de nuestra filosofía, ya que creemos en el poder de las relaciones saludables.
                    <br /><br />
                    En Social SocialNetwork, valoramos a las personas que encuentran energía y satisfacción en las conexiones auténticas.
                    <br /><br />
                    Únete a una red social donde lo verdaderamente importante son las relaciones que construimos y el impacto positivo que podemos tener unos en otros.
                    <br /><br />
                    ¡Conéctate, interactúa y sé parte de algo más grande!
                </p>

            </div>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </Container>
}

export default Login