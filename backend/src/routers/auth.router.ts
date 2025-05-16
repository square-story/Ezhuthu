import { IAuthController } from "@/controllers/interface/IAuthController";
import { container } from "@/di/container";
import { DI_TYPES } from "@/di/types";
import { validate } from "@/middlewares/validate.middleware";
import { signinSchema } from "@/schema/signin.schema";
import { signupSchema } from "@/schema/signup.schema";
import { Router } from "express";

const authRouter = Router()

const authController = container.get<IAuthController>(DI_TYPES.AuthController)

authRouter.post("/register",validate(signupSchema), authController.signup)
authRouter.post("/login",validate(signinSchema), authController.signin)
authRouter.post("/refresh-token",authController.refreshAccessToken);
authRouter.post("/logout",authController.logout);
authRouter.get("/me",authController.me);

export {authRouter}