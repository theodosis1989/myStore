import { IProduct } from '../../src/types/types';

const createProduct = (
    id: number
): IProduct => ({
    id,
    title: 'Product title',
    type: ['type1', 'type2'],
    description: 'Product description',
    price: 123,
    rating: 4,
    country: 'Product country',
    store: 'Product store',
    expDate: '2021-01-01T00:00:00.000Z',
    vegan: true
})

export default createProduct