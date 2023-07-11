import { Router } from "express";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaValidation } from "../middlewares/schemaValidation.js"

const authRouter = Router();
authRouter.post("/cadastro", schemaValidation(signUpSchema), signUp);
authRouter.post("/", schemaValidation(signInSchema), signIn);

export default authRouter;