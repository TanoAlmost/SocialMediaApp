import context from './context'

export default function isUserLoggedIn() {
    return !!context.token
}