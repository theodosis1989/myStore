import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated';
import {
    getProducts,
    getProduct,
    getCart,
    addToCart,
    getOrders,
    postOrder,
    search
} from '../controllers/shopController'

const router = express.Router()

router.get('/search', search)

router.get('/products', getProducts)

router.get('/product/:id', isAuthenticated, getProduct)

router.get('/get-cart', isAuthenticated, getCart)

router.post('/add-to-cart', isAuthenticated, addToCart)

router.get('/get-orders', isAuthenticated, getOrders)

router.post('/post-order', isAuthenticated, postOrder)

export default router