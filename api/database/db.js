import mongoose from 'mongoose';

const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
        process.exit(1);
    }
}

export default connectDb;