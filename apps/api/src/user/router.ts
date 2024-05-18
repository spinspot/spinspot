import { Router } from "express";
import { userController } from "./controller";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:_id", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.put("/:_id", userController.updateUser);

export { userRouter };
