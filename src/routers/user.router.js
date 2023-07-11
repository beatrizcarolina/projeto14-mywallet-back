import { Router } from "express";
import { authentication } from "../middlewares/authValidation.js"
import { getTransactions } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get("/home", authentication, getTransactions);

export default userRouter