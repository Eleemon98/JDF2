import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  app.post("/server/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.fieldname);
  });

  app.use("/server/auth", authRoutes);
  app.use("/server/posts", postRoutes);
  app.use("/server/users", userRoutes);
  app.use("/server/comments", commentRoutes);

  app.listen(8800, () => {
    console.log("서버 실행!");
  });

