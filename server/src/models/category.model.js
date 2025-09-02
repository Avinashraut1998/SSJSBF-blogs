import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdBy  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    }
},
    { timestamps: true }
);


export const Category = mongoose.model("Category", categorySchema);