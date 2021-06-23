#!/bin/bash

# Set this so that the aws CLI does not page output, which causes the script to stop executing
export AWS_PAGER=""

echo "Step 1: Checking environment"
if [ -z $AWS_ACCESS_KEY_ID ]; then
  echo "ERROR: AWS_ACCESS_KEY_ID must be set"
  exit 1
fi
if [ -z $AWS_SECRET_ACCESS_KEY ]; then
  echo "ERROR: AWS_SECRET_ACCESS_KEY must be set"
  exit 1
fi
if [ -z $AWS_DEFAULT_REGION ]; then
  echo "ERROR: AWS_DEFAULT_REGION must be set"
  exit 1
fi

echo "Step 2: Checking for AWS CLI"
if ! command -v COMMAND &> /dev/null; then
  echo "AWS CLI could not be found. Installing."
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
fi

function deploy_to_aws {
  FUNCTION_NAME=$(echo $1 | awk 'BEGIN { FS="."; }; { print $1 }')
  aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$1
  ENVIRONMENT="Variables={$(sed -e 's/export //' ../.env | tr '\n' ',')}"
  aws lambda update-function-configuration --function-name $FUNCTION_NAME --environment $ENVIRONMENT
}

export -f deploy_to_aws

echo "Step 3: Deploying lambda functions"
mkdir -p dist
pushd ./dist

ls . | xargs -L 1 -I % zip %.zip %
ls *.zip | xargs -L 1 -I % bash -c 'deploy_to_aws "$@"' _ %
rm *.zip

popd
