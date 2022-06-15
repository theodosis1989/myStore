export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface IUser {
    email: string;
    password: string;
    cartItems: Map<number, ICartItem>;
    orders: IOrder[];
    isAdmin: boolean;
    save(): IUser;
}

export interface IOrder {
    id: number;
    products: ICartItem[];
    user: number;
    userId: number;
    submitDate: Date;
    status: string;
    save(): IOrder;
}

export interface IProduct {
    id: number;
    title: string;
    type: string[];
    description: string;
    price: number;
    rating: number;
    country: string;
    store: string;
    expDate: string;
    vegan: boolean;
    save(): IProduct;
}