import { expect } from 'chai'
import request from 'supertest'
import { connectDB, disconnectDB } from '../../src/db/index';

const app = require('../../src/app')
const connect = require

describe('.addToCart', () => {
    before(async () => await connectDB)
    after(() => disconnectDB())

    request(app).post('/add-to-cart')
})