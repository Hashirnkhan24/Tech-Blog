import express from 'express';
import connectDb from './database/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
const app = express();
connectDb()
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})