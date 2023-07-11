import { Router } from "express";
import { signUpSchema } from "../schemas/authSchema.js";
import { signUp } from "../controllers/authController.js";
import { schemaValidation } from "../middlewares/schemaValidation.js"

const authRouter = Router();
authRouter.post("/cadastro", schemaValidation(signUpSchema), signUp);

export default authRouter;