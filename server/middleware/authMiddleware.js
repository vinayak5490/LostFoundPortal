import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = async(req, res, next)=>{
    const authHeaders = req.headers.authorization;

    if(authHeaders?.startsWith('Bearer ')){
        const token = authHeaders.split(' ')[1];

        try {
            console.log("JWT_SECRET: ", JWT_SECRET);
            console.log("Token: ", token);
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({message: "token is invalid"})
        }
    }else{
        return res.status(401).json({message: "No token provided"});
    }

}