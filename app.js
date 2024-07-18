import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./Database/dbConnection.js";
import { errorMiddleware } from "./Middlewares/error.js";
import userRouter from "./Routes/userRouter.js";
import fileUpload from "express-fileupload";
import noteRouter from "./Routes/noteRouter.js";
import folderRouter from "./Routes/folderRouter.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:1234/"],
//   })
// );
app.use(
  cors({
    origin: ["https://noti-fyy.netlify.app"],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://noti-fyy.netlify.app/");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// {
//   origin: [process.env.FRONTEND_URL],
//   methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
//   credentials: true,
// }

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/folder", folderRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
