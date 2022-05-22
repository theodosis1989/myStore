import { Response, NextFunction } from 'express';
import User from '../db/models/user'

const getUser = async (req: any, _res: Response, next: NextFunction): Promise<NextFunction | void | undefined> => {
    if (!req.session.user) {
       return next() 
    }
    const currentUser = await User.findOne({ email: req.session.user.email })
    req.user = currentUser
    next()
}

export default getUser