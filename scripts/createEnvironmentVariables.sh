#!/bin/bash -e

{
  echo "AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
} >> ./.env

cat ./.env