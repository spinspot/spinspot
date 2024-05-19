import "express-async-errors";

import { IUser } from "@spin-spot/models";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { authController } from "./auth";
import { errorHandler } from "./error-handler";
import { router } from "./router";

declare global {
  export namespace Express {
    export interface User extends IUser {}
  }
}

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!);

authController.loadProviders();

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
