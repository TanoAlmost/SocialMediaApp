source pepetest.sh

TEST "retrieve-user"

CASE "success on correct user id"

curl 'http://localhost:9000/posts' \
-H 'Authorization: Bearer 65aff83bfce060fe7a0d4a83' \
-v

# > GET /users HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Authorization: Bearer 4945v51dd8i0

# < HTTP/1.1 200 OK
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 19
# < ETag: W/"13-6WtBlAj7hEi29Q9uRrUVVn0dcFk"
# < Date: Wed, 13 Dec 2023 20:31:54 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# {"name":"Man Zana"}

CASE "fails on non-existing user id"

curl 'http://localhost:9000/users' \
-H 'Authorization: Bearer 65aff83bfce060fe7a0d4a83' \
-v

# > GET /users HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Authorization: Bearer 5945v51dd8i0

# < HTTP/1.1 400 Bad Request
# < X-Powered-By: Express
# < Content-Type: application/json; charset=utf-8
# < Content-Length: 44
# < ETag: W/"2c-DA3KcjMxbAqH25TOBQigpuC1Bjs"
# < Date: Wed, 13 Dec 2023 20:33:12 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5

# * Connection #0 to host localhost left intact
# {"error":"Error","message":"user not found"}                                                                                                