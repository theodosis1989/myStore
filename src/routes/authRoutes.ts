import express from 'express'

import { 
    performSingUp,
    performlogIn,
    logOut
} from '../controllers/authController'

const router = express.Router()

router.post('/signup', performSingUp)

router.post('/login', performlogIn)

router.post('/logout', logOut)

export default router
