import dotenv from 'dotenv';
dotenv.config();
import {mongoose} from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;


export const connectDB = async () => {
    try{
        console.log('MongoDB connecting...');
        await mongoose.connect(DATABASE_URL);
        console.log('MongoDB connected ✅');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

