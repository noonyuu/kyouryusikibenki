import { cdate } from "cdate";
import { load } from "ts-dotenv";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

const env = load({
  BUCKET_NAME: String,
  AWS_PROFILE: String,
  S3_ENDPOINT: String,
});

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: fromIni({ profile: env.AWS_PROFILE }),
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: true,
});

const uploadObject = async (filePath: string, date: string) => {
  const fileStream = fs.readFileSync(filePath);
  // パラメータの型をstringに変更
  try {
    const inputParams = new Upload({
      client: s3Client,
      params: {
        Bucket: env.BUCKET_NAME,
        Key: date,
        Body: fileStream,
      },
    });

    const result = await inputParams.done();
    console.log("アップロード完了", result.Location);
    return result.Location;
    // console.log("アップロード完了", result);
  } catch (error) {
    console.error("アップロード失敗", error);
  }
};

const uploadMain = async (filePath: string, fileName: string) => {
  // 画像をS3にアップロード
  try {
    console.log("Image uploaded to S3 successfully");
    return await uploadObject(filePath, fileName);
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error; // エラーを再スローして呼び出し元にエラーを伝える
  }
};

export default uploadMain;
