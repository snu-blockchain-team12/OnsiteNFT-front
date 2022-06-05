npm run build
aws s3 rm --recursive s3://onsitenft --profile=s3-deploy
aws s3 sync ./build s3://onsitenft --profile=s3-deploy
