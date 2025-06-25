import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        type:{
            type:String,
            enum: ['lost', 'found'],
            required: true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        location:{
            type:String,
        },
        imageUrl:{
            type:String,
        },
        date:{
            type:Date,
            default:Date.now()
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        }

    },{timestamps: true}

);

export const Item = mongoose.model("Item", itemSchema);