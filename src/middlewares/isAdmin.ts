import { Response, NextFunction } from 'express'

const isAdmin = (req: any, res: Response, next: NextFunction): void => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        next()
    } else {
        res.send('You are not an admin')
    }
}

export default isAdmin