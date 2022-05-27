import Express, { Request, Response } from "express";
import { CallbackError } from "mongoose";
import morgan from 'morgan'
import cors from 'cors';
import * as dotenv from 'dotenv';
import { dbConnect } from "./config/mongoConfig";
import { VolcanoModel, Volcano } from "./models/Volcano.type";


const PORT = process.env['API_PORT'] || 3000;

const app = Express();
dbConnect();

dotenv.config({ path: __dirname+'/.env' });

app.use(Express.json());
app.use(morgan("dev"));
app.use(cors())

app.get('/', (_, res) => {
    VolcanoModel.findOne({},(err: CallbackError, volcano: Volcano) => {
        if (err) {
            console.log("error", err);
        }
        console.log(volcano);
        res.status(200).json(volcano);
    });
});

app.get('/volcanos', async (req: Request, res: Response) => {
    const long = req.query['long'];
    const lat = req.query['lat'];

    let filter = {};

    if(long !=  null || lat != null){
        console.log("filter found")
    } else {
        console.log("fetching all volcanos")
    }
    
    const volcanos = await VolcanoModel.find(filter).exec();
    res.status(200).json(volcanos);
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));