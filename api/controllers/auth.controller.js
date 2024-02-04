import { signupValidator } from "../types.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    const parsedSignupValidator = signupValidator.safeParse({username, email, password});
    
        try {
            if(!(parsedSignupValidator.success)) {
                return res.status(411).send({
                    message: "Invalid inputs"
                })
            }
            // Creating User
            const hashedPassword = bcryptjs.hashSync(password, 10) //Hashing the password to protect it even inside db

            const newUser = await User({
                username: username,
                email: email,
                password: hashedPassword,
            })
            await newUser.save();
            res.status(200).json({
                message: "User created successfully"
            })

        } catch (error) {
            console.error("Signup Error:", error);
                if (error.code === 11000) {
                  // Unique constraint violation (duplicate entry)
                    return res.status(409).json({
                        success: false,
                        message: "Email or username is already in use",
                    });
                }
            next(error)
        }
}

const signin = async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password || email === "" || password === "") {
        return res.status(411).json({ message: "Email and Password required"})
    }  

    try {
        const validUser = await User.findOne({ email })
            if(!validUser) {
                return res.status(404).json({ message: "User Not Found"})
            }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
            if(!validPassword) {
                return res.status(411).json({ message: "Invalid Credentials"})
            }
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET_KEY)
        const {password: pass, ...rest} = validUser._doc; //To seperate password as we dont want to send it to the client side

        res.status(200)
        .cookie('ACCESS_TOKEN', token, {
            httpOnly: true
        })
        .json(rest)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"})
    }
}
export {signup, signin}