import { Button, Container, Form, Field } from '../library'
import logic from '../logic'

import { useContext } from '../hooks'

export default function (props) {
    console.log('NewPost')

    const context = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            logic.publishPost(image, text, error => {
                if (error) {
                    context.handleError(error)
                    return
                }

                props.onPublish()
            })
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleCancel = event => {
        event.preventDefault()

        props.onCancel()
    }

    return <Container className="new-post">
        <h2>New post</h2>

        <Form onSubmit={handleSubmit}>
            <Field id="image" type="url">Image</Field>
            <Field id="text">Text</Field>

            <Button type="submit">Post</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </Form>
    </Container>
}