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

export async function newTransaction(req,res) {
    const { email } = res.locals.session;
    const { value, description } = req.body;
    const type = req.params.tipo;
    const formatValue = Number(value);

    let changeBalance;

    if (type === "entrada") {
        changeBalance = formatValue;
    } else if (type === "saida") {
        changeBalance = -formatValue;
    } else {
        return res.status(400);
    }

    const transaction = {
        value: formatValue, 
        description, 
        type, 
        date: new Date(),
    }

    try {
        const user = await db.collection("wallet").findOne({ email });

        let newId;
        if(user.transactions.length === 0) {
            newId = 0;
        } else {
            newId = user.transactions[user.transactions.length-1].id + 1;
        }

        await db
            .collection("wallet")
            .updateOne(
                { email },
                {
                    $set: {
                        transactions: [...user.transactions, { ...transaction, id: newId}],
                        balance: user.balance + changeBalance,
                    },
                }
            );
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}