#!/bin/sh

PORT=3000
#run server
echo "call server service"
if [ $NODE_ENV == "production" ]; then
    echo "Running crypto-plants in production mode"
    node /crypto-plants/dist/server.js
else
    echo "Running crypto-plants in development mode"
    node /crypto-plants/src/server.ts
fi


