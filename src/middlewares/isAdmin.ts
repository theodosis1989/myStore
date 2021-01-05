const isAdmin = (req: any, res: any, next: any) => {
    if (req.session.user.isAdmin) {
        next()
    } else {
        res.send('You are not an admin')
    }
}

export default isAdmin