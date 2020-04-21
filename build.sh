#!/bin/bash

cd react && rm -rf node_modules && yarn && yarn build
cd ..

cd preact && rm -rf node_modules && yarn && yarn build
cd ..

cd vanilla && rm -rf node_modules && yarn && yarn build
cd ..

cd angular && rm -rf node_modules && yarn && yarn build --prod --named-chunks
cd ..

cd vue && rm -rf node_modules && yarn && yarn build --target wc-async --inline-vue src/components/*.vue
cd ..

firebase deploy