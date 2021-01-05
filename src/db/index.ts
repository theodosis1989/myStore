import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'

export const connectDB = async () => {

    if (process.env.NODE_ENV === 'test') {
        try {
            const mockgoose = new Mockgoose(mongoose)
            await mockgoose.prepareStorage()
            await mongoose.connect(process.env.MONGO_URL || '',
                    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
                )
            console.log('Test Mongo is ready to use!')
        } catch (err) {
            console.log(`Test MongoDB connection error. Please make sure MongoDB is running. ${err}`)
        }
        
    } else {
        try {
            await mongoose.connect(process.env.MONGO_URL || '',
                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
            )
            console.log('Mongo is ready to use!')
        } catch(err) {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
        }

    }
}

export const disconnectDB = () => mongoose.disconnect()