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

        const cartItemsAfter: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            }
        ]
        expect(updateCartItems(cartItemsBefore, item, 1)).to.deep.equal(cartItemsAfter)
    })

    it('add a new item to a cart', () => {
        const cartItemsBefore: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            }
        ]

        const item: any= {
            id: 101,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            },
            {
                product: {
                    id: 101,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            }
        ]
        
        expect(updateCartItems(cartItemsBefore, item, 1)).to.deep.equal(cartItemsAfter)
    })

    it('add an existing item to a cart', () => {
        const cartItemsBefore: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            },
            {
                product: {
                    id: 101,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 2
            }
        ]

        const item: any = {
            id: 101,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            },
            {
                product: {
                    id: 101,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 3
            }
        ]

        expect(updateCartItems(cartItemsBefore, item, 3)).to.deep.equal(cartItemsAfter)
    })

    it('remove an item from a cart, no remainder for this item', () => {
        const cartItemsBefore: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            },
            {
                product: {
                    id: 101,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            }
        ]
        const item: any = {
            id: 100,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: any[] = [
            {
                product: {
                    id: 101,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            }
        ]

        expect(updateCartItems(cartItemsBefore, item, 0)).to.deep.equal(cartItemsAfter)
    })

    it('remove an item from a cart, no remainder in the cart', () => {
        const cartItemsBefore: any[] = [
            {
                product: {
                    id: 100,
                    title: 'some title',
                    type: 'some type'
                },
                quantity: 1
            },
        ]
        const item: any = {
            id: 100,
            title: 'some title',
            type: 'some type'
        }

        const cartItemsAfter: any[] = []

        expect(updateCartItems(cartItemsBefore, item, 0)).to.deep.equal(cartItemsAfter)
    })
})