import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { load } from "ts-dotenv";

const env = load({
  BUCKET_NAME: String,
  AWS_PROFILE: String,
  S3_ENDPOINT: String,
});

// S3クライアントの初期化
const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: fromIni({ profile: env.AWS_PROFILE }),
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
});

/**
 * 署名付きURLを発行する
 *
 * @param bucket
 * @param key
 * @param expiresIn
 * @returns 署名付きURL
 */

const getPresignedUrl = async (bucket: string, key: string, expiresIn: number): Promise<string> => {
  const objectParams = {
    Bucket: bucket,
    Key: key,
  };
  const url = await getSignedUrl(s3Client, new GetObjectCommand(objectParams), { expiresIn });
  console.log(url);
  return url;
};

export { getPresignedUrl };
