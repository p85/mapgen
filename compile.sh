#!/bin/bash
if [ -z $1 ] || [ -z $2 ] || [ -z $3 ]
then
  echo "Usage: $0 <input-dot-file> <output-file> <-Tsvg|...>"
  exit 1
fi

time neato -x -Goverlap=scale $3 $1 -o $2 -v

