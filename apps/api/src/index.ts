import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { errorHandler } from "./error-handler";
import { router } from "./router";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!);

const app = express();

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGINS || "[]"),
    credentials: true,
  }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  router,
  errorHandler,
);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀 ");
});

export default app;
