import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';

const XAWS = AWSXRay.captureAWS(AWS);

// TODO: Implement the file storage logic
const s3BucketName = process.env.S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION, 10); // Parse to integer

export class AttachmentUtils {
  constructor() {
    this.s3 = new XAWS.S3({ signatureVersion: 'v4' });
    this.bucketName = s3BucketName;
  }

  getAttachmentUrl(todoId) {
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`;
  }

  getSignedUrl(todoId) {
    return this.s3.getSignedUrlPromise('putObject', {
      Bucket: this.bucketName,
      Key: todoId + ".jpg",
      Body: fileData,
      ContentType: 'image/jpeg',
      Expires: urlExpiration
    });
  }
}
