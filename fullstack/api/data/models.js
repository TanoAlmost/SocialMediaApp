import mongoose from 'mongoose';

const { Schema, model, ObjectId } = mongoose;

// Esquema de usuario
const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profilePicture: {
        type: String, // URL de la foto de perfil
        default: 'default-profile.jpg', // Imagen predeterminada
    },
    status: {
        type: String, // Estado civil
        enum: ['Single', 'In a relationship', 'Married', 'Other'],
        default: 'Single',
    },
    interests: [String], // Lista de intereses
    bio: {
        type: String,
        default: '', // Descripción personal
    },
    favs: [
        {
            type: ObjectId,
            ref: 'Post',
        },
    ],
});

// Esquema de comentarios
const comment = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Esquema de posts
const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    image: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    comments: [comment], // Lista de comentarios
});

const User = model('User', user);
const Post = model('Post', post);

export { User, Post };
