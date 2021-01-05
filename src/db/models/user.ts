import mongoose from 'mongoose';
import { UserDoc } from '../../types/types';

const userSchema = new mongoose.Schema({
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
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                product_id: {
                    type: Number,
                    required: true
                },
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

// userSchema.methods.addToCart = function(product) {

// }

// userSchema.methods.removeFromCart = function(productId) {

// }

// userSchema.methods.emptyCart = function() {

// }

export default mongoose.model<UserDoc>('User', userSchema)