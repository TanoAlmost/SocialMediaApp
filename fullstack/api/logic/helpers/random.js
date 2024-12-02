import { ObjectId } from 'mongoose'; // Asegúrate de importar ObjectId

function id() {
    return new ObjectId().toString();
}

function name() {
    return `name-${Math.random()}`;
}

function email() {
    return `e-${Math.random()}@mail.com`;
}

function password() {
    return `password-${Math.random()}`;
}

function image() {
    return `image-${Math.random()}`;
}

function text() {
    return `text-${Math.random()}`;
}

const random = {
    id,
    name,
    email,
    password,
    image,
    text
};

export default random;
