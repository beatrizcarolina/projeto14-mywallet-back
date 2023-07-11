import { Router } from "express";
import { authentication } from "../middlewares/authValidation.js"
import { getTransactions, newTransaction } from "../controllers/userController.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { transactionSchema } from "../schemas/userSchema.js";

const userRouter = Router();
userRouter.get("/home", authentication, getTransactions);
userRouter.post("/nova-transacao/:tipo", authentication, schemaValidation(transactionSchema), newTransaction);

export default userRouter