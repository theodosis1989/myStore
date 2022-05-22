import createApp from './app'
import { connectDB } from './db/index';

connectDB().then(() => 
    createApp().listen(4000, () => {
        console.log('Server has started')
    })
).catch((err: Error) => console.log('Couldnt connect to the db', err))