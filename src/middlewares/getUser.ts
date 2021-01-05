import User from '../db/models/user'

const getUser = async (req: any, _res: any, next: any) => {
    if (!req.session.user) {
       return next() 
    }
    const currentUser = await User.findById(req.session.user._id)
    req.user = currentUser
    next()
}

export default getUser