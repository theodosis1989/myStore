import mongoose from 'mongoose';

export interface UserDoc extends mongoose.Document {
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
                    type: number,
                }
                quantity: { type: Number, required: true }
            }
        ]
    }
}

export interface OrderDoc extends mongoose.Document {
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            id: {
                type: Number,
                required: true
            },
            quantity: { type: Number, required: true }
        }
    ],
    user: {
        email: {
            type: String
        },
        id: {
            type: Number
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    submitDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}

export interface ProductDoc extends mongoose.Document {
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: Array<String>,
        required: true
    },
    description: {
        type: String,
        required: true
    }
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
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    }
}

export interface CartItem {
    productId: number;
    product_id: number;
    quantity: number;
}

export interface Items {
    items: CartItem[];
}

export interface User {
    email: string;
    password: string;
    items: Items[];
}

export interface Order {
    products: CartItem[];
    user: number;
    userId: number;
    submitDate: Date;
    status: string;
}

export interface Product {
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