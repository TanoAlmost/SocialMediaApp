# API

## Register user

- Request: POST /users "Content-Type: application/json" { name, email, password }
- Response: 201
- Response (error): 400|409|500 "Content-Type: application/json" { error, message }

## Authenticate user

- Request: POST /users/auth "Content-Type: application/json" { email, password }
- Response: 200 "Content-Type: application/json" userId
Response (error): 400 "Content-Type: application/json" { error, message }

## Retrieve user

- Request: GET /users "Authorization: Bearer userId"
- Response: 200 "Content-Type: application/json" { name }
Response (error): 400 "Content-Type: application/json" { error, message }

## Create post

- Request: POST /posts "Authorization: Bearer userId" "Content-type: application/json" { image, text }
- Response: 201
Response (error): 400 "Content-Type: application/json" { error, message }

## Toggle like post

- Request: PATCH /posts/postId/likes "Authorization: Bearer userId"
- Response: 204
Response (error): 400|404|406|500 "Content-Type: application/json" { error, message }