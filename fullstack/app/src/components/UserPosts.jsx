import { useParams } from 'react-router-dom'

import { Container } from '../library'

export default function UserPosts() {
    const params = useParams()

    return <Container>
        <h1>TODO show posts from user {params.userId}</h1>
    </Container>
}