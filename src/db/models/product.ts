import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose'
import { ProductDoc } from '../../types/types';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Decimal128,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    expDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model<ProductDoc>('Product', productSchema)