#!/usr/bin/env bash

work_dir=.package

bucket_name=$JGRAPH_APP_NAME-$JGRAPH_ENV_NAME
app_version=$(date +%s)
file_name=dist-$app_version.zip

rm -rf $work_dir
mkdir $work_dir

zip -rq $work_dir/$file_name  dist/*

aws s3 cp $work_dir/$file_name s3://$bucket_name/$file_name

aws cloudformation deploy \
    --template-file ./cloudformation.yml \
    --region $AWS_REGION \
    --stack-name $JGRAPH_APP_NAME \
    --parameter-overrides BucketName=$bucket_name Version=$app_version \
    --capabilities CAPABILITY_IAM
