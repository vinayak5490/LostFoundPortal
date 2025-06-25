import { Item } from "../models/Item.js";

export const createItem = async(req, res)=>{
    try {
        const imageUrl = req.file ? req.file.path : "";
        console.log("req.body:", req.body);
        console.log("imageUrl:", imageUrl);
        console.log("req.user:", req.user);
        const item = await Item.create({
            ...req.body,
            imageUrl,
            user:req.user._id
        });
        res.status(201).json(item);
    } catch (err) {
        console.error("Create Item error: ", JSON.stringify(err, null, 2));
        res.status(500).json({
            error : err.message,
            details: err
        })
    }
}

export const getAllItem = async(req, res)=>{
    try {
        const items = await Item.find().populate('user', 'name email').sort({createdAt: -1});
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}