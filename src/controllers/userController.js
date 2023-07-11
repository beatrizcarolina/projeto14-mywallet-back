import { db } from "../database/database.js"

export async function getTransactions(req, res) {
    const { email } = res.locals.session;

    try {
        const user = await db.collection("wallet").findOne({ email });
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};