# #!/bin/bash

# PORT=8080
# BFF_TEST_DIR=${PWD}/../../
# echo $BFF_TEST_DIR
# BFF_SERVER_DIR=${BFF_TEST_DIR}/server
# BFF_CLIENT_DIR=${BFF_TEST_DIR}/client

# waitfor() {
#     while ! nc -z localhost $1; do   
#         sleep 0.5
#     done
# }

# if [! -d "${BFF_CLIENT_DIR}/node_modules" ]; then
#    cd $BFF_CLIENT_DIR 
#    npm i
# fi

# if [! -d "${BFF_SERVER_DIR}/node_modules" ]; then
#    cd $BFF_SERVER_DIR 
#    npm i
# fi

# cd $BFF_TEST_DIR
# npm i

# docker-compose down
# docker-compose up -d

# echo "starting redis"
# waitfor 6379

# cd $BFF_SERVER_DIR
# npm run start:test > ${BFF_TEST_DIR}/application.log &

# echo "starting app"
# waitfor 8080

# cd $BFF_TEST_DIR

# npm run start:test-component


# pidof node | xargs kill

