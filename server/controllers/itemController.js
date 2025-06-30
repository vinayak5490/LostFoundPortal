import { Item } from "../models/Item.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export const createItem = async(req, res)=>{
    try {
        const imageUrl = req.file ? req.file.path : "";
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

export const deleteItem = async(req, res)=>{
    const item = await Item.findById(req.params.id);
    if(!item) return res.status(404).json({message:"Item not found"});
    if(item.user.toString() !== req.user._id.toString()){
        return res.status(403).json({message: 'Not authorized'});
    }
    await item.deleteOne();
    res.json({message: 'Item deleted'});
};

export const getItemById = async(req, res)=>{
    try {
        const item = await Item.findById(req.params.id).populate('user', 'name email');
        if(!item){
            return res.status(404).json({message: 'Item not found'});
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const foundItemContact = async(req, res)=>{
    const {name, email, phone, message, itemId, ownerEmail} = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: ownerEmail,
            subject: 'Someone found your lost item!',
            text:`
            Name: ${name}
            Email: ${email}
            phone: ${phone}
            Message: ${message}
            Item ID: ${itemId}
            `
        }
        await transporter.sendMail(mailOptions);
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Failed to send email.'});
    }
}