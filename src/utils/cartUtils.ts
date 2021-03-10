import { CartItem, IProduct } from '../types/types';

export const updateCartItems = (cartItems: CartItem[], product: IProduct, quantity: number): CartItem[] => {
    const restOfItems: CartItem[] = cartItems.filter((item: CartItem) => item.product.id !== product.id)
    const newCartItem: CartItem = {
        product,
        quantity
    }
    return quantity > 0 ? [...restOfItems, newCartItem] : [...restOfItems]
}