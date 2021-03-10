import { expect } from 'chai'
import { omit } from 'lodash'
import sinon from 'sinon'
import request from 'supertest'
import { connectDB, disconnectDB } from '../../src/db/index';
import Product from '../../src/db/models/product'
import User from '../../src/db/models/user'
import createApp from '../../src/app'
import createProduct from '../factories/productFactory';
import * as getUserMiddleware from '../../src/middlewares/getUser';
import { IUser, ProductIntefrace } from '../../src/types/types';

describe('.shopController', () => {
    let app: any
    before(async () => await connectDB())

    after(async () => await disconnectDB())

    describe('.getProduct', () => {

        let authStub: any
        beforeEach(async () => {
            await Product.deleteMany({})
            const testUser: IUser = await User.create({
                email: "test@gmail.com ",
                password: "abc",
                cart: {
                    items: [],
                },
                orders: [],
                isAdmin: false
            })

            authStub = sinon.stub(getUserMiddleware, "default")
                .callsFake(async (req, _res, next): Promise<void> => {
                    req.user = testUser
                    // that is happening in the next middleware, not sure how to chain test them
                    req.session.loggedIn = true
                    next()
                })
        })

        afterEach(async () => {
            authStub.restore()
            await Product.deleteMany({})
            await User.deleteMany({})
        })

        it('should return the product with that id', async () => {
            const product1: ProductIntefrace = createProduct(123456)
            app = createApp()
            await Product.insertMany([product1])

            const { status, body } = await request(app)
                .get('/shop/product/123456')

            expect(status).to.equal(200)
            expect(omit(body, ['__v', '_id'])).to.eql({
                ...product1,
                expDate: product1.expDate.toISOString()
            })
        })
    })

    describe('.getProducts', () => {

        beforeEach(async() => await Product.deleteMany({}))

        it('should return all the products in the collection', async () => {
            const product1: ProductIntefrace = createProduct(123457)
            const product2: ProductIntefrace = createProduct(654321)
            app = createApp()
            await Product.insertMany([product1, product2])

            const { body } = await request(app)
                .get('/shop/products')

            const normalizedBody = body.map((item: any) => omit(item, ['__v', '_id']))

            expect(normalizedBody).to.eql([
                {
                    ...product1,
                    expDate: product1.expDate.toISOString()
                },
                {
                    ...product2,
                    expDate: product1.expDate.toISOString()
                }
            ])
        })
    })
})