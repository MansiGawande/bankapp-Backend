import mongoose, { Schema } from "mongoose";

const bankSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    ifsc_code: {
        type: String,
        required: true,
        trim: true
    }
});

const Bank = mongoose.model("Bank", bankSchema);
export default Bank;
