const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.status(401).send('You are not authorized')
    }
}

export default isAuthenticated