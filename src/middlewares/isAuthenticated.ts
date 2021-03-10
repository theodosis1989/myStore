import { Response, NextFunction } from 'express';

const isAuthenticated = (req: any, res: Response, next: NextFunction): void | NextFunction => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.status(401).send('You are not authorized')
    }
}

export default isAuthenticated