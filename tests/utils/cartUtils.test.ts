import { expect } from 'chai'
import { updateCartItems } from '../../src/utils/cartUtils'
import { ICartItem, IProduct } from '../../src/types/types';

describe('.updateCartItems', () => {

    const compareMaps = (map1: Map<number, ICartItem>, map2: Map<number, ICartItem>) => {
        if (map1.size !== map2.size) {
            return false;
        }
        for (var [key, val] of map1) {
            const testVal = map2.get(key);
            if (JSON.stringify(testVal) !== JSON.stringify(val) || (testVal === undefined && !map2.has(key))) {
                return false;
            }
        }
        return true;
    }

    const sampleProduct: IProduct = {
        id: 1,
        title: "title",
        type: ['some type'],
        description: 'description',
        price: 1,
        rating: 1,
        country: 'SWE',
        store: 'store name',
        expDate: "2020-01-01",
        vegan: true
    }

    it('should add an item to an empty cart with quantity 1 when it doesnt exist', () => {
        const cartItemsBefore: Map<number, ICartItem> = new Map();

        const product: IProduct = {
            ...sampleProduct,
            id: 100,
            title: 'some title',
        }
        const quantity: number = 1;

        const cartItemsAfter: Map<number, ICartItem> = new Map();
        cartItemsAfter.set(product.id, { product, quantity });

        expect(compareMaps(updateCartItems(cartItemsBefore, product, quantity), cartItemsAfter)).to.be.true
    })

    it('add a new item to a cart with quantity 1 when it doesnt exist', () => {

        const product: IProduct = {
            ...sampleProduct,
            id: 100,
            title: 'some title',
        }
        const quantity: number = 1;

        const cartItemsBefore: Map<number, ICartItem> = new Map();
        cartItemsBefore.set(product.id, { product, quantity });

        const newProduct: IProduct = {
            ...sampleProduct,
            id: 101,
            title: 'another product',
        }

        const cartItemsAfter: Map<number, ICartItem> = new Map();
        cartItemsAfter.set(product.id, { product, quantity });
        cartItemsAfter.set(newProduct.id, { product: newProduct, quantity });
        
        expect(compareMaps(updateCartItems(cartItemsBefore, newProduct, quantity), cartItemsAfter)).to.be.true
    })

    it('should replace the old quantity when adding an existing item to the cart', () => {

        const product1: IProduct = {
            ...sampleProduct,
            id: 100,
            title: 'some title',
        }

        const product2: IProduct = {
            ...sampleProduct,
            id: 101,
            title: 'some new title',
        }

        const originalQuantity = 1

        const cartItemsBefore: Map<number, ICartItem> = new Map();
        cartItemsBefore.set(product1.id, { product: product1, quantity: originalQuantity });
        cartItemsBefore.set(product2.id, { product: product2, quantity: originalQuantity });

        const newProduct: IProduct = {
            ...sampleProduct,
            id: 101,
            title: 'some new title',
        }

        const newQuantity = 3

        const cartItemsAfter: Map<number, ICartItem> = new Map();
        cartItemsAfter.set(product1.id, { product: product1, quantity: originalQuantity });
        cartItemsAfter.set(product2.id, { product: product2, quantity: newQuantity });

        expect(compareMaps(updateCartItems(cartItemsBefore, newProduct, newQuantity), cartItemsAfter)).to.be.true

    })

    it('remove an item from a cart, no remainder for this item', () => {

        const product1: IProduct = {
            ...sampleProduct,
            id: 100,
            title: 'some title',
        }

        const product2: IProduct = {
            ...sampleProduct,
            id: 101,
            title: 'some new title',
        }

        const originalQuantity = 1
        
        const cartItemsBefore: Map<number, ICartItem> = new Map();
        cartItemsBefore.set(product1.id, { product: product1, quantity: originalQuantity });
        cartItemsBefore.set(product2.id, { product: product2, quantity: originalQuantity });

        const productToRemove: IProduct = product1

        const cartItemsAfter: Map<number, ICartItem> = new Map();
        cartItemsAfter.set(product2.id, { product: product2, quantity: originalQuantity });

        expect(compareMaps(updateCartItems(cartItemsBefore, productToRemove, 0), cartItemsAfter)).to.be.true

    })

    it('remove an item from a cart, no remainder in the cart', () => {

        const product: IProduct = {
            ...sampleProduct,
            id: 100,
            title: 'some title',
        }

        const originalQuantity = 1

        const cartItemsBefore: Map<number, ICartItem> = new Map();
        cartItemsBefore.set(product.id, { product: product, quantity: originalQuantity });

        const productToRemove: IProduct = product

        const cartItemsAfter: Map<number, ICartItem> = new Map();

        expect(compareMaps(updateCartItems(cartItemsBefore, productToRemove, 0), cartItemsAfter)).to.be.true
    })
})