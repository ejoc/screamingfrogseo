#!/bin/bash

DOMAIN=$1
OUTPUT_FOLDER=$2

mkdir -p $OUTPUT_FOLDER

screamingfrogseospider --crawl $DOMAIN --headless --save-crawl --output-folder $OUTPUT_FOLDER --export-format "csv" --export-tabs "Internal:All,Response Codes:All"
