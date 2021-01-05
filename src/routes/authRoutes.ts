import express from 'express'

import { 
    performSingUp,
    performlogIn,
    logOut,
    getLogInPage,
    getSignUpPage
} from '../controllers/authController'

const router = express.Router()

router.get('/loginPage', getLogInPage)

router.post('/signup', performSingUp)

router.post('/login', performlogIn)

router.get('/signup', getSignUpPage)

router.post('/logout', logOut)

export default router
