import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

    otp: {
        type: String, required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true
    },
    resetToken: { 
        type: String, 
        default: null 
    },
},
    { timestamps: true }
);



// TTL Index — deletes document when `expiresAt` time is reached
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model('Otp', otpSchema);