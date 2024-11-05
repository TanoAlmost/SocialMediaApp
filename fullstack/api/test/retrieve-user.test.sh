source pepetest.sh

TEST "retrieve-user"

CASE "success on correct token"

curl 'http://localhost:9000/users' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI2YmQ2YTZmNjFlNDM3ZTIxZDZjZWYiLCJpYXQiOjE3MDY5NjgyNTIsImV4cCI6MTcwNjk2ODI2Mn0.uEpONN4Ywo1dl9t-ShpHtHeQcxqLrkqUE2uvU-cgYcQ' \
-v

CASE "fails on corrupted token"

curl 'http://localhost:9000/users' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI2YmQ2YTZmNjFlNDM3ZTIxZDZjZWYiLCJpYXQiOjE3MDY5NjY3NjQsImV4cCI6MTcwNjk2Njc3NH0.cVYXvPWMT3yYL6mgTSpdQ0gWrnR-cbsXd985dbU1pU' \
-v

CASE "fails on token expired"

curl 'http://localhost:9000/users' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI2YmQ2YTZmNjFlNDM3ZTIxZDZjZWYiLCJpYXQiOjE3MDY5NjY3NjQsImV4cCI6MTcwNjk2Njc3NH0.cVYXvPWMT3yYL6mgTSpdQ0gWrnR-cbsXd985dbU1ApU' \
-v
