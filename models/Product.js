import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product = mongoose.model('Product', new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    size: {
        type: String,
        maxlength: 5,
        required: true
    }    
}))

export default Product