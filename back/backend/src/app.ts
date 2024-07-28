import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import upload from "./multerHandler";
import { downloadMain, uploadMain } from "./routes/minio";
import { GetObjectAclCommandOutput, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { fromIni } from "@aws-sdk/credential-providers";
import { PostDate } from "./routes/post";

require("dotenv").config();
const app = express();

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

app.post("/upload", upload.single("image"), async (req, res) => {
  const imagePath = req.file!.path; // アップロードされた画像のパスを取得
  const fileName = req.file!.filename;
  console.log(req.file); // アップロードされた画像のパスをログに出力

  if (imagePath) {
    try {
      // 画像をS3にアップロード
      const uploadPath: string | undefined = await uploadMain(imagePath, fileName);
      if (!uploadPath) {
        throw new Error("Error uploading image to S3");
      }
      PostDate(req, fileName);

      res.send("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      res.status(500).send("Error uploading image to S3");
    }
  } else {
    res.status(400).send("No file uploaded");
  }
});

// app.get("/", async (req, res) => {
//   try {
//     console.log("Initializing S3 client...");
//     const s3 = new S3Client({
//       region: "ap-northeast-1",
//       credentials: fromIni({ profile: process.env.AWS_PROFILE }),
//       endpoint: process.env.S3_ENDPOINT,
//       forcePathStyle: true,
//     });

//     console.log("Fetching object from S3...");
//     const result = await s3.send(
//       new GetObjectCommand({
//         Bucket: process.env.BUCKET_NAME,
//         Key: "1722121116218-ibgook-Water_1_M_Normal.jpg",
//       })
//     );

//     // console.log("Object fetched from S3:", result);

//     if (!result.Body) {
//       console.error("No body in S3 response");
//       res.status(500).send("Error: No body in S3 response");
//       return;
//     }

//     const readableObj = result.Body as Readable;
//     const chunks: Buffer[] = [];

//     readableObj.on("data", (chunk) => {
//       chunks.push(chunk);
//     });

//     readableObj.on("end", () => {
//       const buffer = Buffer.concat(chunks);
//       const contentType = result.ContentType || "image/png";

//       res.setHeader("Content-Type", contentType);
//       res.setHeader("Content-Length", buffer.length);

//       res.end(buffer);
//       console.log("Readable stream ended");
//     });

//     readableObj.on("error", (err) => {
//       console.error("Error in readable stream:", err);
//       res.status(500).send("Error in readable stream");
//     });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send("Error processing request");
//   }
// });

app.get("/get", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400).send("Error: Date query parameter is required");
      return;
    }

    const s3 = new S3Client({
      region: "ap-northeast-1",
      credentials: fromIni({ profile: process.env.AWS_PROFILE }),
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    });

    console.log("Fetching object from S3...");
    const result = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: "1722128612330-85eb1g-carrot.png",
      })
    );

    if (!result.Body) {
      console.error("No body in S3 response");
      res.status(500).send("Error: No body in S3 response");
      return;
    }

    const readableObj = result.Body as Readable;

    const contentType = result.ContentType || "image/png";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", result.ContentLength as number);

    readableObj.pipe(res);

    readableObj.on("end", () => {
      console.log("Readable stream ended");
    });

    readableObj.on("error", (err) => {
      console.error("Error in readable stream:", err);
      res.status(500).send("Error in readable stream");
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request");
  }
});

console.log("Hello World!!!");
// 404エラーハンドリング
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// エラーハンドリング
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
