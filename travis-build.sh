#!/bin/sh

npm ci

if [[ "$1" == "prod" ]]; then
  npm run push:prod
elif [[ "$1" == "staging" ]]; then
  npm run push:staging
else
  echo "Unknown option $1"
  exit 1
fi
