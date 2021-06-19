#!/bin/bash

# git commit id 
commitid=$(git rev-parse --short HEAD)
# git commit author
author=$(git log --pretty=format:'%an' HEAD -1)
name="${author}:${commitid}"
time=$(date "+%Y/%m/%d/%H/%M/%S")


function tag() {
  echo "Current tag version is ${name}"

  git tag -a "$commitid" -m "${name} at ${time}"

  git push --tag
}


function help() {
    echo "${name}"
    echo "bash $0 --cmd [tag]"
}

if [ "$1" == "" ]; then
    help
elif [ "$1" == "tag" ];then
    tag "$2"
else
    help
fi