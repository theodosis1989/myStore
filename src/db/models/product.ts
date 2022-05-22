import mongoose from 'mongoose'
import { IProduct } from '../../types/types';

const productSchema = new mongoose.Schema<IProduct>({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    type: [{ type: String, required: true }],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
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
        type: String,
        required: false
    },
    vegan: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model<IProduct>('Product', productSchema)