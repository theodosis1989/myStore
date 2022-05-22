import mongoose from 'mongoose'
import { ICartItem } from '../../types/types';

const cartItemSchema = new mongoose.Schema<ICartItem>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

export default mongoose.model<ICartItem>('CartItem', cartItemSchema)