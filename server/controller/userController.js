import mongoose from "mongoose";
import User from "../model/userModel.js";

export const create = async (req,res) => {
    try {
        const newUser= new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email});
        if(userExist)
        {
            return res.status(400).json({message:"User Already Exists"});
        }

        const savedData = await newUser.save();
        // return res.status(200).json(savedData);
        return res.status(200).json({message:"User Saved Succeddfully!"});
    } catch (error) {
        res.status(500).json({errorMessage : error.message});
    }
}

export const getAllUsers = async (req,res) => {
    try {
        const allUsers = await User.find();
        if(!allUsers && allUsers.length === 0)
        {
            return res.status(404).json({message:"No users found!"})
        }
        return res.status(200).json(allUsers);

    } catch (error) {
        return res.status(500).json({errorMessage: error.message})
    }
}

export const getUserById =  async (req,res) => {
    try {
        const id= req.params.id;
        const userExist = await User.findById(id);
       
        if(!userExist && userExist.length === 0){
            return res.status(400).json({message: "No user found by Id"})
        }
        return res.status(200).json(userExist);
    } catch (error) {
        return res.status(500).json({errorMessage:error.message})
    }
}

export const updateUser = async (req,res) => {
    try {
        const id =req.params.id;
        const userExist = await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({message:"User dosen't exists"});
        }
        const updatedData = await User.findByIdAndUpdate(id,req.body,{new:true});
        // return res.status(200).json(updatedData);
        return res.status(200).json({message: "User Updated successfully"});
    } catch (error) {
        return res.status(500).json({errorMessage: error.message});
    }
}


export const deleteUser = async (req,res) => {
    try {
        const id =req.params.id;
        const userExist = await User.findById(id);
        if(!userExist)
        {
            return res.status(404).json({message:"User dosen't exists"});
        }
        const deletedData = await User.findByIdAndDelete(id);
        return res.status(200).json({message: "User Deleted successfully"});
    } catch (error) {
        return res.status(500).json({errorMessage: error.message});
    }
}

export default create;