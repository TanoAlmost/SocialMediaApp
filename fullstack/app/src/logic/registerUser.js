import { validate, errors } from 'com'
const { SystemError } = errors

export default function registerUser(name, email, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.password(password)

    return (async () => {
        const req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }

        let res

        try {
            res = await fetch(`${import.meta.env.VITE_API_URL}/users`, req)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!res.ok) {
            let body

            try {
                body = await res.json()
            } catch (error) {
                throw new SystemError(error.message)
            }

            throw new errors[body.error](body.message)
        }
    })()
}