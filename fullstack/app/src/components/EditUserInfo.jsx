import React, { useState } from 'react';

export default function EditUserInfo({ user, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        profilePicture: user.profilePicture || '',
        status: user.status || '',
        interests: user.interests?.join(',') || '',
        bio: user.bio || '',
    });

    const [imageError, setImageError] = useState(null); // Estado para manejar errores de URL

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Validar que la URL sea válida solo para el campo de la imagen
        if (name === 'profilePicture') {
            try {
                new URL(value); // Intentar crear un objeto URL
                setImageError(null); // No hay error si es válida
            } catch (error) {
                setImageError('Please enter a valid URL'); // Mostrar mensaje de error
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prevenir envío si hay un error con la URL
        if (imageError) {
            alert('Please fix the errors before submitting.');
            return;
        }

        const updatedData = {
            ...formData,
            interests: formData.interests.split(','), // Convertir intereses a array
        };
        onSave(updatedData);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-user-info">
            <label>
                Profile Picture URL:
                <input
                    type="text"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                />
                {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
            </label>
            <label>
                Status:
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
            </label>
            <label>
                Interests (comma-separated):
                <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                />
            </label>
            <label>
                Bio:
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                ></textarea>
            </label>
            <button type="submit" disabled={!!imageError}>Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}
