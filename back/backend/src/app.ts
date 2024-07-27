import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import upload from "./multerHandler";
import uploadMain from "./routes/minio";
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
  console.log("upload");
  const imagePath = req.file!.path; // アップロードされた画像のパスを取得
  const fileName = req.file!.filename;
  console.log(req.file); // アップロードされた画像のパスをログに出力

  if (imagePath) {
    try {
      // 画像をS3にアップロード
      const uploadPath: string | undefined = await uploadMain(imagePath, fileName);

      res.send("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      res.status(500).send("Error uploading image to S3");
    }
  } else {
    res.status(400).send("No file uploaded");
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
