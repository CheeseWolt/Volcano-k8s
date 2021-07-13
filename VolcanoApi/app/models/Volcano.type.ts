import { model, Schema } from "mongoose";
import { GeoJSONSchema } from "./GeoJSON.type";

export interface Volcano {
    "Volcano Name": String,
    Country: String,
    Region: String,
    Location: {
        type: String,
        coordinates: number[]
    },
    Elevation: Number,
    Type: String,
    Status: String,
    "Last Known Eruption": String,
    id: String
}


export const VolcanoSchema = new Schema<Volcano>({
    "Volcano Name": String,
    "Country": String,
    "Region": String,
    "Location": GeoJSONSchema,
    "Elevation": Number,
    "Type": String,
    "Status": String,
    "Last Known Eruption": String,
    "id": String
},
    {
        timestamps: false,
        versionKey: false
    }
)

export const VolcanoModel = model<Volcano>('volcano',VolcanoSchema);