const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');
const { promisify } = require('util');

const randomBytes = promisify(crypto.randomBytes)


const region = "us-east-1";
const bucketName = "rhodiumcarsale";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY_ID;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});


async function generateURL(){
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex'); //32 hexadecimal char string

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    });

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;
}

module.exports = generateURL