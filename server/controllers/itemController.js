import { Item } from "../models/Item.js";

export const createItem = async(req, res)=>{
    try {
        const item = await Item.create({
            ...req.body,
            user:req.user._id
        });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({
            error : err.message
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