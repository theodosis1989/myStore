import app from './app'
import { connectDB } from './db/index';

connectDB().then(() => 
    app.listen(4000, () => {
        console.log('Server has started')
    })
)