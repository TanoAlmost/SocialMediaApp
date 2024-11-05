source pepetest.sh

TEST "toggle-like-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts/65a994e7b4c824321d85d891/likes' \
-H 'Authorization: Bearer 65a6c658f50cc319ad9a0b01' \
-X PATCH \
-v

CASE "fails on wrong post id"
curl 'http://localhost:9000/posts/65a994e7b4c824321d8d891/likes' \
-H 'Authorization: Bearer 65a6c658f50cc319ad9a0b01' \
-X PATCH \
-v