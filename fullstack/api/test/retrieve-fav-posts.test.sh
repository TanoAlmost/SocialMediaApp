source pepetest.sh

TEST "retrieve-posts"

CASE "success on correct user id"

curl 'http://localhost:9000/posts/favs' \
-H 'Authorization: Bearer 65aec7d3b74f4a52aceedd65' \
-v