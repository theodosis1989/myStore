import { Request, Response, NextFunction} from 'express';
import Product from '../db/models/product'
import dataset from '../products'

export const bulkInsert = (_req: Request, res: Response, _next: NextFunction) => {
    console.log('bulk insert all')
    try {
        Product.insertMany(dataset)
            .then(() => {
                console.log('Data inserted')
                return res.status(200).json({ message: 'Data inserted' })
            })
            .catch((err) => {
                console.log('Error inserting data: ', err)
                return res.status(500).json({ message: 'Error inserting data' })
            })
    } catch(err) {
        console.log('cant bulk insert')
    }
}