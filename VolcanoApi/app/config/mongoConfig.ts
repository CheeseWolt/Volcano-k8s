import { CallbackError, connect } from "mongoose";

const MONGO_URL = process.env['MONGO_URL'] || "localhost";
const MONGO_PORT = process.env['MONGO_PORT'] || "27017";
const MONGO_DB = process.env['MONGO_DB'] || "volcanoapp";

export const dbConnect = () => {
    connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}` ,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((err: CallbackError) => console.log(err))
};