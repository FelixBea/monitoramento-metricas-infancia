import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = async () => {
    console.log('db uri', process.env.DB_LOCAL_URI);
    try {
        await mongoose.connect(process.env.DB_LOCAL_URI as string).then((con) => {
            console.log(`MongoDb database connected with host: ${con.connection.host}`);
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB connection failed', error);
    }
};
