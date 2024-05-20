import UserModel from "../Models/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const salt=await bcrypt.genSalt(10);
    const  hashPass=await bcrypt.hash(req.body.password,salt);
    req.body.password=hashPass;
    const newUser = new UserModel(req.body);
    const { Username } = req.body;
    try {
        const olduserName=await UserModel.findOne({Username:Username});
        if(olduserName){
            return res.status(400).json({message:"User already exist"})
        }
        const user=await newUser.save();
        const token=jwt.sign(
            {Username:user.Username,id:user._id},
            "HELLO",{expiresIn:'1hr'}
        );
        console.log({user});
        res.status(200).json({user,token});

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const loginUser=async(req,res)=>{
    const {Username,password}=req.body;
    try {
        let user=await UserModel.findOne({Username:Username});
        if(user){
            const passwordCompare=await bcrypt.compare(password,user.password);
            
            if(!passwordCompare){
                res.status(400).json("Wrong password");
            }else{
                const token=jwt.sign({Username:user.Username,id: user._id},
                    "HELLO",{expiresIn:"1hr"});
                console.log(user);
                res.status(200).json({user,token})
            }
        }
        
    } catch (error) {
        res.status(404).json({error:"Invalid credentials"})
    }
}