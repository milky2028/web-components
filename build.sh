#!/bin/bash

cd react && rm -rf node_modules && yarn && yarn build
cd ..

cd preact && rm -rf node_modules && yarn && yarn build
cd ..

cd vanilla && rm -rf node_modules && yarn && yarn build
cd ..

cd angular && rm -rf node_modules && yarn && yarn build --prod --named-chunks
cd ..

firebase deploy