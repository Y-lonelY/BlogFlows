#!/bin/bash


function tag() {
    echo "Current tag version is $1"
    time=$(date "+%Y/%m/%d-%H:%M:%S")
    echo "${time}"
    git tag -a "$1" -m "${time}"
    git push --tag
}


function help() {
    echo "bash $0 --cmd [tag]"
}

if [ "$1" == "" ]; then
    help
elif [ "$1" == "tag" ];then
    tag "$2"
else
    help
fi
