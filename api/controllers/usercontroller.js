import User from "../models/User.js";
import bcrypt from 'bcryptjs';


//CREATE
export const createUser = async (req, res, next) => {
    const newUser = new User(req.body)

    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err){
        next(err);
    }
}

//UPDATE
export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err){    
        next(err);
    }
}

//DELETE
export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User has been deleted");
    } catch (err){
        next(err);
    }
}

//GET
export const getUser = async (req, res, next) => {
    try{
        const  users = await User.findById(
            req.params.id
        );
        res.status(200).json(users);
    } catch (err){
        next(err);
    }
}

//GET ALL ADMIN PROFILES
export const getAdminProfiles = async (req, res, next) => {
    try {
        const admins = await User.find({ isAdmin: true });

        if (!admins.length) {
            return res.status(404).json({ message: 'No admin profiles found' });
        }

        res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
};


//GET ALL
export const getUsers = async (req, res, next) => {
    try{
        const  users = await User.find();
        res.status(200).json(users);
    } catch (err){
        next(err);
    }
}

// GET USER BY PHONE NUMBER
export const getUserByPhone = async (req, res, next) => {
    try {
        const user = await User.findOne({ phone: req.params.phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err); 
        next(err);
    }
};

//GET ADMIN USERNAMES
export const getAdminUsernames = async (req, res, next) => {
    try {
        const admins = await User.find({ isAdmin: true });

        const adminUsernames = admins.map(admin => admin.username);
        res.status(200).json(adminUsernames);
    } catch (err) {
        next(err);
    }
}

//GET ADMIN DETAILS
export const getAdminDetails = async (req, res, next) => {
    try {
        const admins = await User.find({ isAdmin: true });

        res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
}

// Function to reset the user's password
export const resetPassword = async (req, res) => {
    try {
      const { userId, newPassword } = req.body;
        const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
  
      const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ success: false, message: 'Password reset failed' });
    }
  };

  // GET USER COUNT
export const getUserCount = async (req, res, next) => {
    try {
        const totalCount = await User.countDocuments();
        res.status(200).json({ totalCount });
    } catch (err) {
        next(err);
    }
};