import express from 'express';
import connectDb from './database/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config()
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly specify the allowed origin
    credentials: true
}));
app.use(cookieParser())
connectDb()
app.use(express.json())


app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})