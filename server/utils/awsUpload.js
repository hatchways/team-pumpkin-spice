const aws = require("aws-sdk");
const md5 = require("md5");
const config = require("../config/config");

aws.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretKey
});

const s3 = new aws.S3();

const startUpload = async data => {
  try {
    const upload = await s3.upload(data).promise();
    return upload;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const uploadPicture = async (userId, picture) => {
  //TODO figure out what format the picture is going to come in from the client and pass it in
  const hash = md5(picture);
  const params = {
    Bucket: config.aws.bucketName,
    Body: picture,
    ACL: "public-read",
    Key: `${userId}/${hash}`
  };

  return await startUpload(params);
};
