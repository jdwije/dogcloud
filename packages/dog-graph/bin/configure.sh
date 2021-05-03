#!/usr/bin/env bash

echo "Running machine configuration script"
echo "...................................."
echo

config_path=.env
app_name=$(cat package.json | jq .name)
# clear existing config
rm $config_path

echo "Enter a unique enviornment name"
read env_name
echo

echo "Enter aws profile name"
read aws_profile
echo


echo "Enter aws region name"
read aws_region
echo

echo "JGRAPH_APP_NAME=$app_name" >> .env
echo "JGRAPH_ENV_NAME=$env_name" >> .env
echo "AWS_PROFILE=$aws_profile" >> .env
echo "AWS_REGION=$aws_region" >> .env







