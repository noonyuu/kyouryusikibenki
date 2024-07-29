import multer from "multer";
import fs from "fs";
import path from "path";

// ファイルの保存先とファイル名を指定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 画像がuploadされるパス
    const uploadPath = path.resolve(__dirname, "../uploads");

    // uploadPathにディレクトリが存在するかどうかを確認
    if (!fs.existsSync(uploadPath)) {
      // uploadPathにディレクトリが存在しない場合、ディレクトリを作成
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  // アップロードされるファイル名を作成
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10);
    cb(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // ファイルのMIMEタイプが以下のいずれかの場合のみファイルアップロードを許可
    if (["image/png", "image/jpeg", "image/webp"].includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new TypeError("Invalid File Type"));
  },
});

export default upload;
