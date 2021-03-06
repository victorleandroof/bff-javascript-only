#!/bin/bash

PORT=8080
BFF_ROOT_DIR=${PWD}/../..
echo $BFF_ROOT_DIR
BFF_SERVER_DIR=${BFF_ROOT_DIR}/server
BFF_CLIENT_DIR=${BFF_ROOT_DIR}/client

waitfor() {
    while ! nc -z localhost $1; do   
        sleep 0.5
    done
}

if [! -d "${BFF_CLIENT_DIR}/node_modules" ]; then
   cd $BFF_CLIENT_DIR 
   npm i
fi

if [! -d "${BFF_SERVER_DIR}/node_modules" ]; then
   cd $BFF_SERVER_DIR 
   npm i
fi

cd $BFF_ROOT_DIR
npm i

redis-server > ${BFF_ROOT_DIR}/redis.log &
echo "starting redis"
waitfor 6379

cd $BFF_SERVER_DIR
npm run start:test > ${BFF_ROOT_DIR}/application.log &
echo "starting app"
waitfor 8080

cd $BFF_ROOT_DIR

npm run start:mock &

echo "starting mock"
waitfor 4567

npm run test:performance

pidof node | xargs kill
pidof redis-server | xargs kill

