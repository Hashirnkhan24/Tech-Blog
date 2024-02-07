import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { response } from 'express';

export const test = (req, res) => {
    res.json({
        message : "API working successfully "
    })
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return res.status(411).json({
            message : "You are not authorized to update this user"
        })
    }
    if(req.body.password){
        if(req.body.password.length < 6) {
            return res.status(403).json({
                message : "Password too short"
            })
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if(req.body.username) {
        if(req.body.username.length < 5 || req.body.username.length > 20) {
            return res.status(403).json({
                message : "Username must be between 5 and 20 characters"
            })
        }
        if(req.body.username.includes(' ')) {
            return res.status(403).json({
                message : "Usename cannot contain spaces"
            })
        }
        if(req.body.username !== req.body.username.toLowerCase()) {
            return res.status(403).json({
                message : "Username must be in lowercase"
            })
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(403).json({
                message : "Username can only contain letters and numbers"
            })
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username : req.body.username,
                    password : req.body.password,
                    email : req.body.email,
                    profilePicture : req.body.profilePicture,
                }
            }, { new: true })
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest)
        } catch (error) {
            next(error)
        }
    }
}

export const deleteUser = async(req, res, next) => {
    
    if(req.user.id !== req.params.userId) {
        return res.status(403).json({
            message: "You are not authorized to delete this user"
        })
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const signout = async(req, res, next) => {
    try {
        res
            .clearCookie('access_token')
            .json({
                message: 'User has been signed out'
            })
    } catch (error) {
        next(error)
    }
}

export const getUsers = async(req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).json({
            message: 'You are not allowed to see all users'
        })
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort ==='asc' ? 1 : -1;

        const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit)

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        })

        const totalUsers = await User.countDocuments()

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        })
    } catch (error) {
        next(error)
    }
}