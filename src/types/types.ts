import mongoose from 'mongoose';
export interface CartItem {
    product: IProduct;
    quantity: number;
}

export interface Items {
    items: CartItem[];
}
export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    cart: Items;
    orders: IOrder[];
    isAdmin: boolean;
}

export interface IOrder extends mongoose.Document {
    products: CartItem[];
    user: number;
    userId: number;
    submitDate: Date;
    status: string;
}

export interface IProduct extends ProductIntefrace, mongoose.Document {
}

export interface ProductIntefrace {
    id: number;
    title: string;
    type: string[];
    description: string;
    price: number;
    rating: number;
    country: string;
    store: string;
    expDate: Date;
    status: string;
    vegan: boolean;
}