import { ICartItem, IProduct } from '../types/types';

export const updateCartItems = (cartItems: Map<number, ICartItem> = new Map(), product: IProduct, quantity: number): Map<number, ICartItem> => {
    const currenlySelectedProductAlreadyInTheCart: ICartItem | undefined = cartItems.has(product.id)
        ? cartItems.get(product.id)
        : undefined;

    if (currenlySelectedProductAlreadyInTheCart && quantity === 0) {
        cartItems.delete(product.id)
    } else {
        cartItems.set(product.id, { product, quantity })
    }

    return cartItems
}