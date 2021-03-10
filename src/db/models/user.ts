import mongoose from 'mongoose';
import { IUser } from '../../types/types';
import productSchema from "./product"

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product: productSchema.schema,
                quantity: { type: Number, required: true }
            }
        ]
    },
    orders: [
        {
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
                required: false
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model<IUser>('User', userSchema)