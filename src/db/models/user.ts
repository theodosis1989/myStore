import mongoose from 'mongoose';
import { IUser, ICartItem } from '../../types/types';
const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    cartItems: {
        type: Map,
        of: { type: typeof ICartItem }
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    isAdmin: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model<IUser>('User', userSchema)