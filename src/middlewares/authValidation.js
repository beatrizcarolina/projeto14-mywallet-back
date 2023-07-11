import { db } from "../database/database.js";

export async function authentication(req, res, next) {
    const { auth } = req.headers;
    const token = auth?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("sessions").findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }
        res.locals.session = session;
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}