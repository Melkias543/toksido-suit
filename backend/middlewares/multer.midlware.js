import multer from "multer";
import { upload } from "../utils/ multerConfig.js";

const multerMiddleware = (req, res, next) => {
// console.log("Multer Middleware Invoked",req.body);
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // console.error("Multer Error:", err.message);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // console.error("Unknown Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

        // 🔥 ADD DEBUG LOGS HERE
    // console.log("FILE OBJECT:", req.file);
    // console.log("UPLOAD PATH:", req.file?.path);
    // ✅ attach file name here (IMPORTANT)
    if (req.file) {
      req.body.image = req.file.filename;
      // console.log("File saved as:", req.file.filename);
    }

    next();
  });
};

export default multerMiddleware;