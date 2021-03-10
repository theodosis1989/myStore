import mongoose from 'mongoose'
import { IOrder } from '../../types/types';

const orderSchema = new mongoose.Schema<IOrder>({
  products: [
    {
      product_id: { type: Number, required: true },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: { type: Number, required: true }
    }
    
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

export default mongoose.model<IOrder>('Order', orderSchema)