import { CartItem } from '../types/types';

export const updateCartItems = (cartItems: CartItem[], product: any, quantity: number) => {
    const restOfItems = cartItems.filter((item: CartItem) => item.product_id !== product.id)
    return quantity > 0 ? [...restOfItems, { product_id: product.id, productId: product._id, quantity }] : [...restOfItems]
}