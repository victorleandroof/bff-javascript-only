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

npm run test:component


pidof node | xargs kill
pidof redis-server | xargs kill

