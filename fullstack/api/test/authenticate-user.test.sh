source pepetest.sh

TEST "authenticate-user"

CASE "success on correct credentials"

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{ "email": "peter@pan.com", "password": "123123123" }' \n
-v

# > POST /users/auth HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 52

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 13
# < ETag: W/"d-b8Amkw2rKfQoSHwgJiTQmhg8K8o"
# < Date: Wed, 13 Dec 2023 19:54:45 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
#
# "e65oriudio8"

CASE "error on wrong email"

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{ "email": "peter@pan.com", "password": "123123123" }' \
-v

# > POST /users/auth HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 58

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Wed, 13 Dec 2023 20:07:08 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5 

# {"error":"Error","message":"user not found"}%

CASE "error on wrong password"

curl 'http://localhost:9000/users/auth' \
-H 'Content-Type: application/json' \
-d '{ "email": "man@zana.com", "password": "wrong-123123123" }' \
-v

# > POST /users/auth HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Content-Type: application/json
# > Content-Length: 58

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 47
# < ETag: W/"2f-gSxgt/X3rXUFm8ouTih67ywXda0"
# < Date: Wed, 13 Dec 2023 20:18:52 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"error":"Error","message":"wrong credentials"}