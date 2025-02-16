import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {

  const {fullName,email,password} = req.body
  
  
  try {

      if(!fullName || !email || !password){
        return res.status(400).json({message : "Fill all the feilds"});
      }

      if(password.length < 6){
        return res.send("Password Length should be atleast character 6");
      }

      const user = await User.findOne({email})
      if(user) return res.status(400).json({message : "Email Already exists"})

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      const newUser = new User({
        fullName,
        email,
        password : hashedPassword
      })

      if(newUser){
        generateToken(newUser._id,res)
        await newUser.save();

        res.status(201).json({
          _id:newUser._id,
          fullName:newUser.fullName,
          email:newUser.email,
          profilePic: newUser.profilePic
        })
      }
      else{
        res.status(400).json({message:"Invalid User Data"})
      }

  } catch (error) {
      console.log("Error in signup Controller",error.message);
      res.status(500).json({message : "Internal Server Error"});
  }


}

export const login = async (req, res) => {
  const {email,password} = req.body

  try {
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message:"Invalid User Credential"})
    }
    
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Invalid User Credential"})
    }

    generateToken(user._id,res)

    res.status(201).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic: user.profilePic
    })

  } catch (error) {
    console.log("Error in Login Controller",error.message);
    res.status(500).json({message: "Internal Server Error"})
  }
}
export const logout = async (req, res) => {
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged Out Successfully"})
  }
  catch(error){
    console.log("Error in Logout Controller",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
} 

export const updateProfile = async(req,res)=>{
  try {
    const {profilePic}=req.body;
    const userID = req.user._id;
    
    if(!profilePic){
      return res.send(400).json({message:"Profile Pic is Required"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(userID, {profilePic : uploadResponse.secure_url} ,{ new:true})

    res.status(200).json(updatedUser)

  } catch (error) {
    console.log("Error in update Profile",error);
    res.status(500).json({message:"Internal Server Error"})
  }
}

export const checkAuth = (req,res)=>{
  try{
    res.status(200).json(req.user);
  }catch(error){
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}