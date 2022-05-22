import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import authRoutes from './routes/authRoutes'
import shopRoutes from './routes/shopRoutes'
import adminRoutes from './routes/adminRoutes'
import * as connectMongo from 'connect-mongodb-session'
import getUser from './middlewares/getUser'

const app = express()

const createApp = () => {
  const MongoDBStore = connectMongo.default(session)

  const store = new MongoDBStore({
    uri: process.env.MONGO_URL || '',
    collection: 'sessions'
  });

  app.use(
    session({
      secret: process.env.SECRET || '',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  app.use(cors({ origin: true, credentials: true }))
  app.use(getUser)

  app.use('/auth', bodyParser.json(), authRoutes)
  app.use('/shop', bodyParser.json(), shopRoutes)
  app.use('/admin', bodyParser.json(), adminRoutes)

  return app
}
export default createApp