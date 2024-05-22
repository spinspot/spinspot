import { auth } from "@/middleware";
import { Router } from "express";
import { userController } from "./controller";

const userRouter = Router();

userRouter.get("/", auth(), userController.getUsers);
userRouter.get("/:_id", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.put("/:_id", auth(), userController.updateUser);

export { userRouter };
