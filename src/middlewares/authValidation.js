import { db } from "../database/database.js";

export async function authentication(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    console.log("Validate Token: " + token);

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        console.log("Session: " + session);

        if (!session) {
            return res.sendStatus(401);
        }
        res.locals.session = session;
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}