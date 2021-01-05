import { expect } from 'chai'
import { updateCartItems } from '../../src/utils/cartUtils'
import { CartItem } from '../../src/types/types';

describe('.updateCartItems', () => {
    it('add an item to an empty cart', () => {
        const cartItemsBefore: CartItem[] = []

        const item: any= {
            id: 100,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: CartItem[] = [{ productId: 100, quantity: 1, product_id: 1 }]
        console.log('before', updateCartItems(cartItemsBefore, item, 1))
        console.log('after', cartItemsAfter)
        expect(updateCartItems(cartItemsBefore, item, 1)).to.deep.equal(cartItemsAfter)
    })

    it('add a new item to a cart', () => {
        const cartItemsBefore: CartItem[] = [{ productId: 100, quantity: 1, product_id: 1 }]

        const item: any= {
            id: 101,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: CartItem[] = [
            { productId: 100, quantity: 1, product_id: 1 },
            { productId: 101, quantity: 1, product_id: 1 }
        ]
        
        expect(updateCartItems(cartItemsBefore, item, 1)).to.deep.equal(cartItemsAfter)
    })

    it('add an existing item to a cart', () => {
        const cartItemsBefore: CartItem[] = [
            { productId: 100, quantity: 1, product_id: 1 },
            { productId: 101, quantity: 1, product_id: 1 }
        ]

        const item: any = {
            id: 101,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: CartItem[] = [
            { productId: 100, quantity: 1, product_id: 1 },
            { productId: 101, quantity: 3, product_id: 1 }
        ]

        expect(updateCartItems(cartItemsBefore, item, 3)).to.deep.equal(cartItemsAfter)
    })

    it('remove an item from a cart, no remainder', () => {
        const cartItemsBefore: CartItem[] = [
            { productId: 100, quantity: 1, product_id: 1 },
            { productId: 101, quantity: 1, product_id: 1 }
        ]

        const item: any = {
            id: 100,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: CartItem[] = [
            { productId: 101, quantity: 1, product_id: 1 }
        ]

        expect(updateCartItems(cartItemsBefore, item, 0)).to.deep.equal(cartItemsAfter)
    })
})