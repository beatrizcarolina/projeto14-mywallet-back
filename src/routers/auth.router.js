import { Router } from "express";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { signUp, signIn, signOut } from "../controllers/authController.js";
import { schemaValidation } from "../middlewares/schemaValidation.js"
import { authentication } from "../middlewares/authValidation.js";

const authRouter = Router();
authRouter.post("/cadastro", schemaValidation(signUpSchema), signUp);
authRouter.post("/", schemaValidation(signInSchema), signIn);
authRouter.post("/signout", authentication, signOut);

export default authRouter;