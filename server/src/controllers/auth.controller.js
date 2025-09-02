import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        };

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User is not registered" });


        const isPasswordCorrect = await user.checkPassword(password);

        if (!isPasswordCorrect) return res.status(401).json({ error: "Invalid credentials" });

        let accessToken = await user.createAccessToken();
        let refreshToken = await user.createRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        const options = {
            httpOnly: true,
            secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        }
        user.password = '';
        user.refreshToken = '';
        res.status(200)
        .cookie('refreshToken', refreshToken, options)
        .json({
            body: {
                user,
                accessToken
            },
            message: "User logged in successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logoutUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const options = { httpOnly: true, secure: true }
        await User.findOneAndUpdate({ _id: userId }, { $set: { refreshToken: null } });
        return res.status(200)
            .clearCookie('refreshToken', options)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken  = req.cookies.refreshToken;

    if(!incomingRefreshToken) return res.status(401).json({ error: "Unauthorized Request" });
    try {

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findOne({ _id: decodedToken._id });

        if (!user ) {
            return res.status(401).json({ error: "Unauthorized Request" });
        };
        
        if( user.refreshToken !== incomingRefreshToken) return res.status(401).json({ error: "Refresh token is expired or used" });
    
        const newRefreshToken = await user.createRefreshToken();
        const newAccessToken = await user.createAccessToken();

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        }
        res.cookie('refreshToken', newRefreshToken, options);
        res.status(200).json(
            { body: { 'accessToken': newAccessToken },
             message: 'Access token created successfully'
            });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is Required" });
        }
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found with this email' });

        const recentOtp = await Otp.findOne({
            email,
            createdAt: { $gte: new Date(Date.now() - 60000) } // Last 1 minute
        });

        if (recentOtp) {
            return res.status(429).json({ 
                error: 'Please wait before requesting another OTP' 
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const tenMinute = 1000 * 60 * 10;

        const otpDetails = await Otp.create({
            otp: otp,
            email: user.email,
            isUsed: false,
            expiresAt: new Date(Date.now() + tenMinute)
        });

        // sendOtpEmail('Demo App <demo@demomailtrap.co>', user.email, ' reset password', otp);

        return res.status(200).json({
            otp : otp,
            message: 'OTP sent Succesfully'
        })

    } catch (error) {
        console.log("forgotPassword",error);
        res.status(500).json({ error: error.message });
    }

}

const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

         const userOtp = await Otp.findOne({ 
            email: email.toLowerCase(), 
            otp,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        if (!userOtp) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        if (userOtp.expiresAt < new Date()) return res.status(400).json({ error: "OTP has expired" });

        const resetPasswordToken = await jwt.sign({ email ,    otpId: userOtp._id.toString()}, process.env.PASS_RESET_TOKEN, { expiresIn: '10min' });

        userOtp.isUsed = true;
        userOtp.resetToken = resetPasswordToken;
        await userOtp.save();


        return res.status(200)
            .json({
                resetToken: resetPasswordToken,
                message: 'Otp verified successfully plese reset password'
            })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const resetPassword = async (req,res) => {

    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) return res.status(400).json({ error: "All fields are required" });

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.PASS_RESET_TOKEN);
        } catch (err) {
            return res.status(401).json({ error: "Invalid or expired reset token." });
        }
        
        const otp = await Otp.findOne(
            { 
                email: decoded.email,
                _id: decoded.otpId,
                resetToken
             }
        );

        if (!otp) {
            return res.status(401).json({ 
                error: "Reset token has already been used or expired" 
            });
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) return res.status(404).json({ error: "User not found" });

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        otp.resetToken = null;
        await otp.save();

        console.log(`Password reset successful for user: ${user.email} at ${new Date()}`);

        return res.status(200).json({ message: "Password reset successfully" });


    } catch (error) {
          console.error("Error resetting password:", error);
          res.status(500).json({ error: error.message });
    }

}


export { loginUser, forgotPassword, verifyResetOtp, resetPassword, logoutUser , refreshAccessToken};