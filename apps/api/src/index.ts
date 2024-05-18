import { IUser } from "@spin-spot/models";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { authService } from "./auth";
import { errorHandler } from "./error-handler";
import { router } from "./router";

import "express-async-errors";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI!);

declare global {
  export namespace Express {
    export interface User extends IUser {}
  }
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ?? "$pin$pot",
    },
    async function verify(payload, done) {
      try {
        const user = await authService.validateJWT(payload);
        done(null, user ?? false);
      } catch (err) {
        done(err);
      }
    },
  ),
);

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
