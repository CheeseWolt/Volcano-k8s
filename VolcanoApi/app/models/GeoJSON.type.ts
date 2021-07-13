import { Schema } from "mongoose";

export interface GeoJSON {
    "type": String,
    "coordinates": number[]
}

export const GeoJSONSchema = new Schema<GeoJSON>({
    "type": String,
    "coordinates": [Number]
})