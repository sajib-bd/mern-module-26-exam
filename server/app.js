import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import dotenv from "dotenv";
import mongodbSanitize from "mongodb-sanitize";

import DATABASE from "./config/database.js";
import blog from "./routes/blogRouter.js";
import admin from "./routes/adminRoute.js";
import service from "./routes/serviceRouter.js";
import team from "./routes/teamRouter.js";
import contact from "./routes/contactRouter.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

const limit = rateLimit({
  windowMs: process.env.REQ_MS,
  max: process.env.REQ_LIMIT,
  message: "Too many requests, please try again later.",
  statusCode: 429,
});

app.use(limit);
const allowedOrigins = process.env.FRONTEND_URLS.split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(mongodbSanitize());
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", blog, admin, service, team, contact);

app.listen(PORT, () => {
  DATABASE();
  console.log(`server listening on ${PORT}`);
});
