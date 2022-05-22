import 'dotenv/config'
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || '')

        console.log('Mongo is ready to use!')
    } catch (err) {
        console.log(`Test MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    }   
}

export const disconnectDB = async () => await mongoose.disconnect()