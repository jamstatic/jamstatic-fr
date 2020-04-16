#!/bin/bash

# install Go
curl -OL https://dl.google.com/go/go1.13.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.13.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# run Hugo
hugo version
hugo --gc --minify
