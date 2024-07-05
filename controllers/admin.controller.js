const { generateToken } = require('../jwtAuth/jwt');
const User = require('../models/user.models');

const checkAdmin = async (userID) => {
    try{
        const user = await User.findById(userID);
        
        if(user.role === 'admin') return true;
    }catch(err){
        return false;
    }
}

exports.createUser = async (req,res) => {
    try{
        const admin = await checkAdmin(req.user.id);
        
        if(!admin) {
            return res.status(400).json({
                message: "Unauthorized role"
            });
        }

        const userData = req.body;

        if(userData == null){
            return res.status(400).json({
                message: "User data cannot be empty"
            });
        }

        const newUser = new User(userData);
        const response = await newUser.save();

        res.status(200).json({
            data : response,
            message: "New user created successfullly"
        });
    }catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured"
        });
    }
}

exports.updateUser = async (req,res) => {
    try{
        if(!await checkAdmin(req.user.id)){
            return res.status(404).json({
                message: 'Unauthorized role'
            });
        }

        const userData = req.body;
        const userId = req.params.uId;
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            data: updatedUser,
            message: 'User updated successfully'
        });
    }
    catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured"
        });
    }
}

exports.deleteUser = async (req,res) => {
    try{
        if(!await checkAdmin(req.user.id)){ 
            return res.status(404).json({
                message: "Unauthorized role"
            });
        }
        
        const userId = req.params.uId;
        
        if(userId == null){
            return res.status(400).json({
                message: "Candidate id is missing"
            });
        }
        
        const response = await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured"
        });
    }
}

exports.getUser = async (req,res) => {
    try{
        if(!await checkAdmin(req.user.id)){ 
            return res.status(404).json({
                message: "Unauthorized role"
            });
        }

        const getUserList = await User.find();
        const lone = getUserList.filter(item => item.role === 'user');

        if(!lone){
            return res.status(404).json({
                message: "Users not found"
            })
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: lone,
        });
    }
    catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured"
        });
    }
}