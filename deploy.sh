#!/bin/sh

# Set this so that the aws CLI does not page output, which causes the script to stop executing
export AWS_PAGER=""

function deploy_to_aws {
  FUNCTION_NAME=$(echo $1 | awk 'BEGIN { FS="."; }; { print $1 }')
  aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://$1
}

export -f deploy_to_aws

pushd ./dist

ls . | xargs -L 1 -I % zip %.zip %
ls *.zip | xargs -L 1 -I % sh -c 'deploy_to_aws "$@"' _ %
rm *.zip

popd
