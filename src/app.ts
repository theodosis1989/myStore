import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
// import csrf from 'csurf'
import authRoutes from './routes/authRoutes'
import shopRoutes from './routes/shopRoutes'
import adminRoutes from './routes/adminRoutes'
import * as connectMongo from 'connect-mongodb-session'
import getUser from './middlewares/getUser'
import { helloWorld } from './controllers/hello'

const app = express()

// const csrfProtection = csrf();
const createApp = () => {
  const MongoDBStore = connectMongo.default(session)

  const store = new MongoDBStore({
    uri: process.env.MONGO_URL || '',
    collection: 'sessions'
  });

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  app.use(cors({ origin: true, credentials: true }))
  app.use(getUser)

  // app.use(csrfProtection);

  // app.use((req, res, next) => {
  //   res.locals.csrfToken = req.csrfToken()
  //   next()
  // })
  app.use('/auth', bodyParser.json(), authRoutes)
  app.use('/shop', bodyParser.json(), shopRoutes)
  app.use('/admin', bodyParser.json(), adminRoutes)
  app.use('/', helloWorld)

  return app
}
export default createApp