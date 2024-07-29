import { cdate } from "cdate";
import { load } from "ts-dotenv";
import { GetObjectAclCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import { Get } from "routing-controllers";

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
const downLoadObject = async (key: string) => {
  try {
    const getObjectParams = new GetObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
    });
    const result = await s3Client.send(getObjectParams);
    // console.log("ダウンロード完了", result);
    return result;
  } catch (error) {
    console.error("ダウンロード失敗", error);
    throw error; // エラーを再スローして呼び出し元にエラーを伝える
  }
};

// ダウンロード処理のメイン関数
const downloadMain = async (filePath: string) => {
  try {
    console.log("Starting download process");
    return await downLoadObject(filePath);
  } catch (error) {
    console.error("Error during download process:", error);
    throw error; // エラーを再スローして呼び出し元にエラーを伝える
  }
};

export { uploadMain, downloadMain };
