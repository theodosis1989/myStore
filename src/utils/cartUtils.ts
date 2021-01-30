// import { CartItem } from '../types/types';

export const updateCartItems = (cartItems: any[], product: any, quantity: number) => {
    const restOfItems = cartItems.filter((item: any) => item.product.id !== product.id)
    const newProduct = {
        product,
        quantity
    }
    return quantity > 0 ? [...restOfItems, newProduct] : [...restOfItems]
}