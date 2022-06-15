import { Response, NextFunction } from 'express';
import User from '../db/models/user'
import { IUser } from '../types/types';

const getUser = async (req: any, _res: Response, next: NextFunction): Promise<NextFunction | void | undefined> => {
    if (!req.session.user) {
       return next() 
    }
    const currentUser: IUser | null = await User.findOne({ email: req.session.user.email })
    req.user = currentUser
    next()
}

export default getUser