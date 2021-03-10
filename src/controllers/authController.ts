import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../db/models/user'
import { IUser } from '../types/types';

const secret = 'mysecretttt'

export const performSingUp = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password, repeatPassword } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        return res.send(`user ${email} exists`)
    }

    if (password !== repeatPassword) {
        return res.send('passwords do not match')
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ email: email, password: hashedPassword })
    await newUser.save()
    return res.send(`New user ${email} been created`)
}

export const getSignUpPage = (_req: Request, res: Response, _next: NextFunction) => {
    return res.send('page to sign up')
}

export const performlogIn = async (req: any, res: Response, _next: NextFunction) => {
    try {
        const { email, password } = req.body
        const currentUser: IUser | null = await User.findOne({ email: email })
        if (!currentUser) {
            console.log('user doesnt exists')
            return res.status(401).json({ error: 'User doesnt exist' })
        }
        if (currentUser.password && bcrypt.compareSync(currentUser.password, password)) {
            console.log('wrong password')
            return res.status(401).json({ error: 'Wrong password' })
        }

        req.session.loggedIn = true
        req.session.user = currentUser
        req.session.cookieSid = req.rawHeaders[13].split('=')[1]
        await req.session.save()
        const payload = { email }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        return res.status(200).cookie('token', token, { httpOnly: true }).json({ isAdmin: req.session.user.isAdmin })
    } catch(err) {
        return res.status(500).json({error: 'Internal server error'})
    }
}

export const getLogInPage = (_req: Request, res: Response, _next: NextFunction) => {
    return res.send('page to login')
}

export const logOut = async (req: Request, res: Response, _next: NextFunction) => {
    req.session.destroy((err: any) => {
        console.log('the error was', err)
    })
    console.log('user has been logged out')
    return res.status(200).json('user has been logged out')
}