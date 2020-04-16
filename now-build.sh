#!/bin/bash

# install Go
echo "================================================================================"
echo "Installing Go..."
curl -sSOL https://dl.google.com/go/go1.13.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.13.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

echo "================================================================================"
echo "Hugo current version:"
hugo version

# install Hugo
echo "================================================================================"
echo "Installing Hugo 0.69.0..."
curl -sSOL https://github.com/gohugoio/hugo/releases/download/v0.69.0/hugo_0.69.0_Linux-64bit.tar.gz
tar -xzf hugo_0.69.0_Linux-64bit.tar.gz
./hugo version

# install theme(s)
echo "================================================================================"
echo "Installing theme(s)..."
#git submodule update --init --recursive
#git submodule add https://github.com/DirtyF/hugo-json-api-component themes/json-api
curl -sSOL https://github.com/DirtyF/hugo-json-api-component/archive/master.zip
unzip master.zip
mkdir -p ./themes/json-api
mv ./hugo-json-api-component-master ./themes/json-api

cd themes
ls -l

# run Hugo
echo "================================================================================"
echo "Building site..."
./hugo --gc --minify
