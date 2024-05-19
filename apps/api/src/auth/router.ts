import { Router } from "express";
import { authController } from "./controller";

const authRouter = Router();

authRouter.get(
  "/sign-in/google/callback",
  authController.signInWithGoogleCallback,
);
authRouter.post("/sign-in/credentials", authController.signInWithCredentials);
authRouter.post("/sign-in/google", authController.signInWithGoogle);
authRouter.post("/refresh", authController.refresh);

export { authRouter };
