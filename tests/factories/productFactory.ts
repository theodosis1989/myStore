import { ProductIntefrace } from '../../src/types/types';

const createProduct = (
    id: number
): ProductIntefrace => ({
    id,
    title: 'Product title',
    type: ['type1', 'type2'],
    description: 'Product description',
    price: 123,
    rating: 4,
    country: 'Product country',
    store: 'Product store',
    expDate: new Date('2021-01-01T00:00:00.000Z'),
    status: 'available',
    vegan: true
})

export default createProduct