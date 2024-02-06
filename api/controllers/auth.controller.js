import { signupValidator } from "../types.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
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
        .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'None',
        })
        .json(rest)
    } catch (error) {
        next(error)
    }
}

const google = async(req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({email})
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            const {password, ...rest} = user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json({rest})
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = await User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            })
            await newUser.save()
            const {password, ...rest} = newUser._doc
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
                sameSite: 'None',
            }).json(rest)
        }
    } catch (error) {
        next(error)
    }
}
export {signup, signin, google}