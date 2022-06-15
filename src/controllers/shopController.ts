import Product from '../db/models/product'
import Order from '../db/models/order'
import ElasticQuery from '../lib/elasticQuery'
import ElasticClient from '../clients/elasticClient'
import { updateCartItems } from '../utils/cartUtils'
import { Request, Response, NextFunction } from 'express';
import { IOrder, IProduct } from '../types/types'

export const search = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const client = new ElasticClient()
        const searchBody = new ElasticQuery()
        searchBody.getQuery(req.query)

        const searchResult = await client.executeSearch(searchBody)
        const { hits, aggregations } = searchResult.body
        return res.status(200).json(
            { 
                results: hits.hits.map((item: any) => item._source),
                aggregations
            }
        )
    } catch (err) {
        console.log('search something went wrong: ', err)
        return res.status(500).json({ message: `search something went wrong: ${err}` })
    }
}

export const getProducts = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const products: IProduct[] | null = await Product.find()
        return res.status(200).json(products)
    } catch(err) {
        console.log(`getProducts something went wrong: ${err}`)
        return res.status(500).json({ message: `getProducts something went wrong: ${err}`})
    }
}

export const getProduct = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const product: IProduct | null = await Product.findOne({ id: Number(id) })
        if (!product) {
            console.log('Product wasnt found')
            return res.status(404).json({ message: 'Product wasnt found'})
        }
        return res.status(200).json(product)
    } catch (err) {
        return res.status(500).json({ message: `getProduct something went wrong: ${err}`})
    }
}

export const getCart = (req: any, res: Response, _next: NextFunction) => {
    try {
        return res.status(200).json(req.user.cartItems)
    } catch (err) {
        console.log('getCart something went wrong: ', err)
        return res.status(500).json({ message: `getCart something went wrong: ${err}`})
    }
}

export const addToCart = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { product, quantity } = req.body as { product: IProduct, quantity: number }
        const currentCartItems = product ? updateCartItems(req.user.cartItems, product, quantity) : req.user.cartItems
        req.user.cartItems = JSON.stringify(currentCartItems)
        await req.user.save()
        return res.status(200).json({ message: 'Success' })
    } catch(err) {
        console.log('addToCart something went wrong: ', err)
        return res.status(500).json({ message: `addToCart something went wrong: ${err}`})
    }
}

export const getOrders = async (req: Request, res: Response, _next: NextFunction) => {
    const orderIds = req.user.orders.map((order: IOrder) => order.id)
    try {
        const orders: IOrder[] | null = await Order.find({ _id: { $in: orderIds } })
        return res.status(200).json(orders)
    } catch (err) {
        console.log('getOrders something went wrong: ', err)
        return res.status(500).json({ message: `getOrders something went wrong: ${err}`})
    }
}

export const postOrder = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { cartItems } = req.user
        const myOrder: IOrder = new Order({
            products: cartItems,
            user: {
                email: req.user.email,
            },
            submitDate: new Date('2020-01-01'),
            status: 'available'
        })
        const orderId = await myOrder.save()

        req.user.cartItems = new Map()
        req.user.orders.push(orderId)
        await req.user.save()
        return res.status(200)
    } catch (err) {
        console.log('postOrder something went wrong: ', err)
        return res.status(500).json({ message: `postOrder something went wrong: ${err}`})
    }
}