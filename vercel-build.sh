#!/bin/bash

# default versions
if [ -z $GO_VERSION ]; then GO_VERSION='1.15.2'; fi
if [ -z $HUGO_VERSION ]; then HUGO_VERSION='0.75.1'; fi

# install Go
curl -sSOL https://dl.google.com/go/go${GO_VERSION}.linux-amd64.tar.gz
tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# install packages
echo "Installing packages..."
node -v
npm install --loglevel=error

# install Hugo
echo "Installing Hugo $HUGO_VERSION..."
curl -sSOL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
tar -xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz
./hugo version

# install theme(s)
curl -sSOL https://github.com/DirtyF/hugo-json-api-component/archive/master.zip
unzip -q master.zip
mkdir -p ./themes/json-api
mv ./hugo-json-api-component-master/* ./themes/json-api/

# run Hugo
echo "Running Hugo..."
./hugo --gc --minify
