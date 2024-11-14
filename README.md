
# SocialMediaApp API Documentation

**SocialMediaApp** está diseñado para fomentar la interacción social auténtica, promoviendo la comunicación, empatía, adaptabilidad y colaboración entre usuarios. Esta API permite a los usuarios registrarse, autenticarse, crear publicaciones, y reaccionar a los posts de otros.

## Base URL
- **URL:** `http://localhost:9000`

## Endpoints

### 1. Register User
- **Endpoint:** `POST /users`
- **Description:** Permite registrar un nuevo usuario.
- **Request Body:**
  ```json
  {
    "name": "Tano Son",
    "email": "Tano@son.com",
    "password": "123123123"
  }
  ```
- **Tests:**
  - Comprueba que el estado de respuesta sea `201`.
  - Verifica que el tiempo de respuesta sea menor a 300ms.
  - Asegura que el contenido de respuesta incluya el tipo `application/json`.

### 2. Authenticate User
- **Endpoint:** `POST /users/auth`
- **Description:** Permite autenticar a un usuario registrado.
- **Request Body:**
  ```json
  {
    "email": "Tano@son.com",
    "password": "123123123"
  }
  ```
- **Tests:**
  - Comprueba que el estado de respuesta sea `200`.
  - Verifica que el tiempo de respuesta sea menor a 300ms.
  - Asegura que el contenido sea `application/json`.

### 3. Retrieve User
- **Endpoint:** `GET /users`
- **Authorization:** `Bearer Token`
- **Description:** Recupera los datos del usuario autenticado.

### 4. Change User Email
- **Endpoint:** `PATCH /users/email`
- **Authorization:** `Bearer Token`
- **Request Body:**
  ```json
  {
    "newEmail": "ta@nino.com",
    "newEmailConfirm": "ta@nino.com",
    "password": "123123123"
  }
  ```
- **Description:** Permite al usuario cambiar su correo electrónico actual.

### 5. Retrieve Posts
- **Endpoint:** `GET /posts`
- **Authorization:** `Bearer Token`
- **Description:** Recupera todos los posts disponibles en la plataforma.

### 6. Create New Post
- **Endpoint:** `POST /posts`
- **Authorization:** `Bearer Token`
- **Request Body:**
  ```json
  {
    "text": "Este es el contenido del post",
    "image": "https://picsum.photos/200/300"
  }
  ```
- **Description:** Crea un nuevo post con contenido y una imagen opcional.

### 7. Toggle Like Post
- **Endpoint:** `PATCH /posts/:postId/likes`
- **Authorization:** `Bearer Token`
- **Description:** Permite al usuario dar o quitar "like" a un post.

### 8. Toggle Favorite Post
- **Endpoint:** `PATCH /posts/:postId/favs`
- **Authorization:** `Bearer Token`
- **Description:** Agrega o elimina un post de la lista de favoritos del usuario.

### 9. Retrieve Favorite Posts
- **Endpoint:** `GET /posts/favs`
- **Authorization:** `Bearer Token`
- **Description:** Recupera todos los posts que el usuario ha marcado como favoritos.

### 10. Update Post Text
- **Endpoint:** `PATCH /posts/:postId/text`
- **Authorization:** `Bearer Token`
- **Request Body:**
  ```json
  {
    "text": "Nuevo texto del post"
  }
  ```
- **Description:** Permite al autor de un post actualizar su contenido de texto.

### 11. Delete Post
- **Endpoint:** `DELETE /posts/:postId`
- **Authorization:** `Bearer Token`
- **Description:** Elimina un post específico, solo accesible por el autor del post.

## Postman Collection
Puedes importar la colección de Postman para probar estos endpoints. Asegúrate de tener configurada la variable `base_url` con el valor `http://localhost:9000` en tus variables de entorno de Postman.

## Uso y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/SocialMediaApp.git
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
```plaintext
MONGODB_URL=mongodb://127.0.0.1:27017/api
JWT_SECRET=your_jwt_secret
PORT=9000
```

### 4. Ejecutar el Servidor
```bash
npm start
```
El servidor se ejecutará en `http://localhost:9000`.

### 5. Ejecutar Pruebas
```bash
npm test
```

## Contribución
Agradecemos cualquier contribución para mejorar esta aplicación. Por favor, abre un *pull request* o crea un *issue* para sugerencias.

## Licencia
Este proyecto está bajo la licencia MIT.

---

¡Gracias por utilizar **SocialMediaApp**! Esperamos que esta documentación te sea útil y te ayude a interactuar de manera eficiente con nuestra API.
