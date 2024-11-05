source pepetest.sh

TEST "toggle-fav-post"

CASE "success on correct data"

curl 'http://localhost:9000/posts/65a98c679b027b09563c5c59/favs' \
-H 'Authorization: Bearer 65abfd4bb4c824321d85d89f' \
-X PATCH \
-v

CASE "fails on wrong post id"
curl 'http://localhost:9000/posts/65a98c679b027b0563/favs' \
-H 'Authorization: Bearer 65abfd4bb4c824321d85d89f' \
-X PATCH \
-v