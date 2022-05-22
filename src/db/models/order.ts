import mongoose from 'mongoose'
import { IOrder } from '../../types/types';

const orderSchema = new mongoose.Schema<IOrder>({
  id: { type: Number, required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
      },
      quantity: { type: Number, required: true }
    }
    
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model<IOrder>('Order', orderSchema)