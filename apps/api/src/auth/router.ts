import { Router } from "express";
import { authController } from "./controller";

const authRouter = Router();

authRouter.post("/sign-in", authController.signIn);

export { authRouter };
