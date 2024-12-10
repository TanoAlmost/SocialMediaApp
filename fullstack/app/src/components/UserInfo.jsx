import React from 'react';

export default function UserInfo({ user, isOwner, onEditClick }) {
    return (
        <section className="user-info">
            <h1>{user.name}</h1>
            <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                style={{ maxWidth: '150px', borderRadius: '50%' }}
            />
            <p>Status: {user.status || 'Not specified'}</p>
            <p>Interests: {user.interests?.join(', ') || 'No interests specified'}</p>
            <p>Bio: {user.bio || 'No bio available'}</p>

            {isOwner && <button onClick={onEditClick}>Edit</button>} {/* Mostrar botón solo si es el propietario */}
        </section>
    );
}
