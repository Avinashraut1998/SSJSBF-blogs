
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        // required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    tags: {
        type: [String],
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    createdBy  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    updatedBy  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},
    { timestamps: true }
);


export const Blog = mongoose.model("Blog", blogSchema);


