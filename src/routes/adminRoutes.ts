import express from 'express'

import { 
    bulkInsert,
} from '../controllers/adminController'
import isAdmin from '../middlewares/isAdmin'

const router = express.Router()

router.get('/insertAll', isAdmin, bulkInsert)

export default router
