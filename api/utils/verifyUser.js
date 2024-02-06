import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if(!token) {
        return res.status(411).json({
            message : "unauthorized"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(411).json({
                message : "unauthorized"
            })
        }
        req.user = user;
        next()
    })
}