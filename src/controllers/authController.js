import bcrypt from "bcrypt";
import { db } from "../database/database.js";
import { v4 as uuidv4 } from "uuid";

export async function signUp(req,res) {
     const { name, email, password } = req.body;

     console.log("Signup: " + email);

    try {
        const invalidUser = await db.collection("users").findOne({ email });

        if (invalidUser) {
            return res.status(409).send("Email já registrado!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        
        await db.collection("users").insertOne({ name, email, password: hashPassword});
        await db.collection("wallet").insertOne({ name, email, balance: 0, transactions: [] });


        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}