import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


export const Signup = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({message: 'user already exists'});
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedpassword});

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn:'7d'});

        res.status(201).json({
            message: "User registered Successfully",
            token,
            user:{id: user._id, name:user.name, email: user.email}
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const Login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {id: user._id, name: user.name, email: user.email}
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}