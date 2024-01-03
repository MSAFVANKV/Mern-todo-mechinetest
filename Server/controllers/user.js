import userCollection from "../modals/userModal.js";
import UserDataModel from "../modals/dataModal.js";

import mongoose from "mongoose";
import bcrypt from 'bcrypt'


export const userRegistration = async (req, res) =>{
    console.log("userRegistration");
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.json({msg:"Please enter all fields",status: false});
            }
            //checking username already exists or not
            const user = await userCollection.findOne({username:username})
            if(user){
                return res.json({msg:'User Already Exists',status: false});
            }
            const hashPsw =  await bcrypt.hash(password, 10);
            const newUser = await new userCollection({
                username,
                password:hashPsw
            });
            //saving the user to database
            await newUser.save();
            delete newUser.password;
            return res.json({
                msg: "User Registered Successfully",
                status: true,
                newUser,
              });

    } catch (error) {
        console.error("error in user registration", error);
    }
}

export const loginUser = async (req, res) => {
    try{
        const {username,password} = req.body;
        const user = await userCollection.findOne({username});
        if (!user) {
            return res.json({msg:"user Not Registred",status: false})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({msg:"Password incorrect",status: false})
        }
        delete user.password;
        return res.json({ status: true, user }); 


    } catch (err) {
        console.error("error in user registration", err);
    }
}


export const createData = async (req, res) => {
    console.log("Request Payload:", req.body);

    try {
        const { fullname, department ,userId } = req.body;
        // const {userId} = req.params;

        // Check if both fullname and department are provided
        if (!fullname || !department) {
            return res.status(400).json({ msg: "Please provide both fullname and department", status: false });
        }


        const newData = await new UserDataModel({
            fullname,
            department,
            user:userId,
        });

        await newData.save();
        console.log("Data added successfully");

        return res.json({ msg: "Data added successfully", newData });
    } catch (error) {
        console.error("Error in creating data", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};



// controllers/user.js
// export const getUserData = async (req, res) => {
//     try {
        
//         const userData = await UserDataModel.find();
//         return res.json(userData);
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return res.status(500).json({ msg: "Internal Server Error"});
//     }
// };
export const getUserData = async (req, res) => {
    console.log("getUserData")

    try {
        const { id } = req.params; 
        console.log(id,"id getUserData")
        const usersel = await userCollection.findOne({ _id: id });

        if (!usersel) {
            return res.status(404).json({ msg: "User not found", status: false });
        }

        const userData = await UserDataModel.find({ user: usersel._id }).sort({_id:-1})
        return res.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const deleteData = async (req, res) => {
    try {
        const {id} = req.params
        const userData = await UserDataModel.findByIdAndDelete({_id:id});
        return res.json(userData);
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ msg: "Internal Server Error"});
    }
};


export const editData = async (req, res) => {
    console.log("editData");
    try {
        const { id } = req.params;
        const { fullname, department } = req.body; // Provide the data to update
        const updatedData = await UserDataModel.findByIdAndUpdate(
            { _id: id },
            { fullname, department },
            { new: true } // Return the updated document
        );

        if (!updatedData) {
            return res.status(404).json({ msg: "Data not found", status: false });
        }

        return res.json({ msg: "Data updated successfully", updatedData });
    } catch (error) {
        console.error("Error updating user data:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

