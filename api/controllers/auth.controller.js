import { signupValidator } from "../types.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    const parsedSignupValidator = signupValidator.safeParse({username, email, password});
    
        try {
            if(!parsedSignupValidator.success) {
                return res.status(411).send({
                    message: "Invalid inputs"
                })
            }
            // Creating User
            const hashedPassword = bcryptjs.hashSync(password, 10)

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
            next(error)
        }
}

export {signup}