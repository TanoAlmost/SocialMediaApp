import { Button, Link, Form, Field, Container } from '../library'
import logic from '../logic'

import logo from "../assets/logo-w-wh-s.png"

import { useContext } from '../hooks'

function Register(props) {
    console.log('Register')

    const context = useContext()

    function handleSubmit(event) {
        event.preventDefault()

        const nameInput = event.target.querySelector('#name-input')
        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value

        try {
            logic.registerUser(name, email, password)
                .then(() => props.onSuccess())
                .catch(error => context.handleError(error))
        } catch (error) {
            context.handleError(error)
        }
    }

    function handleLoginClick(event) {
        event.preventDefault()

        // console.log('login click')
        props.onLoginClick()
    }

    return <Container className="container-background">
        <h1 className='h1-register'>Register</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="name-input">Name</Field>
            <Field id="email-input" type="email">E-mail</Field>
            <Field id="password-input" type="password">Password</Field>

            <Button type="submit">Register</Button>
        </Form>

        <Link onClick={handleLoginClick}>Login</Link>


        <div className="scrollable-container">
            <p className="paragraph-register">

                <strong>POR FAVOR, LEEME ANTES DE REGISTRARTE!</strong>
                <br /><br />
                En Social SocialNetwork, creemos en la importancia de crear un espacio seguro para conversaciones significativas y comprometidas. Los temas principales que abordaremos incluyen aspectos artísticos, políticos y de derechos humanos, todos ellos desde una perspectiva en contra del fascismo y el extremismo, es decir orientada a la humanidad y al futuro de las nuevas generaciones.
                <br /><br />
                Queremos que nuestra plataforma sea un lugar donde se discutan temas importantes y relevantes para el mundo actual, como el cambio climático, la justicia social y los derechos fundamentales de las personas. En TheOnlyGoodSystem Social SocialNetwork, fomentamos el intercambio de ideas que buscan construir un futuro más justo, equitativo y sostenible.
                <br /><br />
                Este es un espacio para quienes buscan inspirar y ser inspirados, para quienes desean expresar sus preocupaciones y soluciones frente a los retos de nuestra era, y para aquellos que creen en el poder de la comunidad para transformar el mundo.
                <br /><br />
                Únete a TheOnlyGoodSystem Social SocialNetwork y forma parte de una red social comprometida con el progreso social y el bienestar colectivo.
            </p>

        </div>

        <img src={logo} alt="Logo" className="logo-register" />
    </Container>
}

export default Register