import Product from '../db/models/product'
import Order from '../db/models/order'
import ElasticQuery from '../lib/elasticQuery'
import ElasticClient from '../clients/elasticClient'
import { updateCartItems } from '../utils/cartUtils'

export const search = async (req: any, res: any, _next: any) => {
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

export const getProducts = async (_req: any, res: any, _next: any) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch(err) {
        console.log(`getProducts something went wrong: ${err}`)
        return res.status(500).json({ message: `getProducts something went wrong: ${err}`})
    }
}

export const getProduct = async (req: any, res: any, _next: any) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ id: id })
        if (!product) {
            console.log('Product wasnt found')
            return res.status(404).json({ message: 'Product wasnt found'})
        }
        return res.status(200).json(product)
    } catch (err) {
        return res.status(500).json({ message: `getProduct something went wrong: ${err}`})
    }
}

export const getUser = async (req: any, res: any, _next: any) => {
    return res.status(200).json(req.user)
}

export const getCart = (req: any, res: any, _next: any) => {
    try {
        return res.status(200).json(req.user.cart.items)
    } catch (err) {
        console.log('getCart something went wrong: ', err)
        return res.status(500).json({ message: `getCart something went wrong: ${err}`})
    }
}

export const addToCart = async (req: any, res: any, _next: any) => {
    try {
        const { product_id, quantity } = req.body
        const product = await Product.findOne({ id: product_id })
        req.user.cart.items = product ? updateCartItems(req.user.cart.items, product, quantity) : req.user.cart.items
        await req.user.save()
        return res.status(200).json({ message: 'Success' })
    } catch(err) {
        console.log('addToCart something went wrong: ', err)
        return res.status(500).json({ message: `addToCart something went wrong: ${err}`})
    }
}

export const getOrders = async (req: any, res: any, _next: any) => {
    const orderIds = req.user.orders.map((order:any) => order._id)
    try {
        const orders = await Order.find({ _id: { $in: orderIds } })
        return res.status(200).json(orders)
    } catch (err) {
        console.log('getOrders something went wrong: ', err)
        return res.status(500).json({ message: `getOrders something went wrong: ${err}`})
    }
}

export const postOrder = async (req: any, res: any, _next: any) => {
    try {
        const { items } = req.user.cart
        const myOrder = new Order({
            products: items,
            user: {
                email: req.user.email,
                userId: req.user._id
            },
            submitDate: new Date('2020-01-01'),
            status: 'available'
        })
        const orderId = await myOrder.save()

        req.user.cart.items = []
        req.user.orders.push(orderId)
        await req.user.save()
        return res.status(200)
    } catch (err) {
        console.log('postOrder something went wrong: ', err)
        return res.status(500).json({ message: `postOrder something went wrong: ${err}`})
    }
}