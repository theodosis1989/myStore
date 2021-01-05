import jwt from 'jsonwebtoken'
import User from '../db/models/user'
import { UserDoc } from '../types/types';

const secret = 'mysecretttt'

export const performSingUp = async (req: any, res: any, _next: any) => {
    const { email, password, repeatPassword } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        return res.send(`user ${email} exists`)
    }

    if (password !== repeatPassword) {
        return res.send('passwords do not match')
    }

    const newUser = new User({ email: email, password: password })
    await newUser.save()
    return res.send(`New user ${email} been created`)
}

export const getSignUpPage = (_req: any, res: any, _next: any) => {
    return res.send('page to sign up')
}

export const performlogIn = async (req: any, res: any, _next: any) => {
    try {
        const { email, password } = req.body
        const currentUser: UserDoc | null = await User.findOne({ email: email })
        if (!currentUser) {
            console.log('user doesnt exists')
            return res.status(401).json({ error: 'User doesnt exist' })
        }
        if (currentUser.password && currentUser.password !== password) {
            console.log('wrong password')
            return res.status(401).json({ error: 'Wrong password' })
        }
        req.session.loggedIn = true
        req.session.user = currentUser
        req.session.cookieSid = req.rawHeaders[13].split('=')[1]
        await req.session.save()
        const payload = { email }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true }).sendStatus(200)
    } catch(err) {
        res.status(500).json({error: 'Internal server error'})
    }
}

export const getLogInPage = (_req: any, res: any, _next: any) => {
    return res.send('page to login')
}

export const logOut = async (req: any, res: any, _next: any) => {
    req.session.destroy((err: any) => {
        console.log('the error was', err)
    })
    console.log('user has been logged out')
    return res.status(200).json('user has been logged out')
}