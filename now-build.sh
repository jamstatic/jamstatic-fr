#!/bin/bash

# install Go
curl -sSOL https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.14.1.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# install Hugo
echo "Installing Hugo 0.69.0..."
curl -sSOL https://github.com/gohugoio/hugo/releases/download/v0.69.0/hugo_0.69.0_Linux-64bit.tar.gz
tar -xzf hugo_0.69.0_Linux-64bit.tar.gz
./hugo version

# install theme(s)
#git submodule update --init --recursive
#git submodule add https://github.com/DirtyF/hugo-json-api-component themes/json-api
curl -sSOL https://github.com/DirtyF/hugo-json-api-component/archive/master.zip
unzip -q master.zip
mkdir -p ./themes/json-api
mv ./hugo-json-api-component-master/* ./themes/json-api/

# run Hugo
echo "Running Hugo..."
./hugo  --gc --minify
