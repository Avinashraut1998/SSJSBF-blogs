
import { User } from "../models/user.model.js";


const createUser = async (req, res) => {

    const {
        userName,
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role
    } = req.body;
    try {
        if ( !userName || !firstName || !lastName || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ error: "All fields are required" });
        };

        const userExists = await User.findOne({ email });

        if(userExists && userExists.userName === userName) return res.status(400).json({ error: "Username already exists" });

        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        };

        const user = await User.create({
            userName,
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            role
        });

        user.password = '';

        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserDetails = async (req, res) => {
    return res.status(200).json({ user: req.user, message: "User details fetched successfully" });
}

const getAllUsers = async (_, res) => {
    try {
        const users = await User.find({ isActive: true }).select( 'firstName lastName email role isActive' );
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
     try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        if (!user) return res.status(404).json({ error: "User not found" });

        const { firstName, lastName, email, phoneNumber, role  } = req.body;

        if(  !firstName || !lastName || !role || !phoneNumber || !email) return res.status(400).json({ error: "All fields are required" });

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.role = role;

        await user.save();

        return res.status(200).json({ message: "User updated successfully" });
     } catch (error) {
        return res.status(500).json({ error: error.message });
     }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        if (!user) return res.status(404).json({ error: "User not found" }); 1

        const loggedUser =  await User.findOneAndUpdate({ _id: id }, { $set: { isActive: false } });
        console.log(loggedUser);

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



export {
    createUser,  getUserDetails, getAllUsers,updateUser,deleteUser
};