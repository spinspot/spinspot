import { auth } from "@/middleware";
import { Router } from "express";
import { authController } from "./controller";

const authRouter = Router();

authRouter.get("/current-user", auth(), authController.getCurrentUser);
authRouter.get("/sign-in/google", authController.signInWithGoogle);
authRouter.get(
  "/sign-in/google/callback",
  authController.signInWithGoogleCallback,
);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/sign-in/credentials", authController.signInWithCredentials);
authRouter.post("/sign-up/credentials", authController.signUpWithCredentials);
authRouter.post("/sign-out", authController.signOut);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/forgot-password", authController.forgotPassword);

export { authRouter };
