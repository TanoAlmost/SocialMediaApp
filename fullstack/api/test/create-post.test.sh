source pepetest.sh

TEST "create-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts' \
-H 'Authorization: Bearer 65a6c658f50cc319ad9a0b01' \
-H 'Content-Type: application/json' \
-d '{ "image": "https://cdn2.vectorstock.com/i/1000x1000/81/46/hello-world-code-vector-22928146.jpg", "text": "Hello, World!" }' \
-v

# > POST /posts HTTP/1.1
# > Host: localhost:9000
# > User-Agent: curl/8.1.2
# > Accept: */*
# > Authorization: Bearer 4945v51dd8i0
# > Content-Type: application/json
# > Content-Length: 123

# < HTTP/1.1 201 Created
# < X-Powered-By: Express
# < Date: Thu, 14 Dec 2023 19:33:30 GMT
# < Connection: keep-alive
# < Keep-Alive: timeout=5
# < Content-Length: 0