#!/bin/sh

VERSION=test

while getopts "v:" arg; do
  case $arg in
    v) VERSION=$OPTARG;;
  esac
done

echo "-----"
echo "building and pushing docker image with version: '${VERSION}'"
echo "-----"
docker build --platform=linux/amd64 -t ghcr.io/faberadvies/myplanetplan-app:${VERSION} .
echo "-----"
docker push ghcr.io/faberadvies/myplanetplan-app:${VERSION}
echo "-----"
echo "Done"

