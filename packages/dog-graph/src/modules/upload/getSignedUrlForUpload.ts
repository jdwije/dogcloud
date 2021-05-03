import { GraphQLFieldResolver } from "graphql";
import { AppContext } from "../../hoc";

const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();

const ttlInSeconds = 300;

export const getSignedUrlForUpload = async (cnf: AppContext, parent: any, args: any) => {
  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key: args.input.key,
    Expires: ttlInSeconds,
    ContentType: args.input.contentType,
    ACL: args.input.public ? 'public-read' : 'private'
  };

  const uploadUri = await s3.getSignedUrlPromise("putObject", s3Params);

  return JSON.stringify({
    url: uploadUri,
  });
};
