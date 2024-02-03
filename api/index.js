import express from 'express';
import connectDb from './database/db.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
connectDb()
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})