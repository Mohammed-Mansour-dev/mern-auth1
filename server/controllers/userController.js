import UserModel from "../models/UserModel.js";


// !get user data
export const getUserData =async (req ,res) =>{

try {
// get user id
const {userId} =req.body;
if(!userId) return res.json({success:false ,error:"userId not found ,Login again"})
// get & check user
const user = await UserModel.findById(userId);
if(!user) return res.json({success:false ,error:"user not found ,Login again"})


    return res.json({success:true,userData:{
        name:user.name,
        isUserVerified:user.isAccountVerified
    }});
    
} catch (error) {
    console.log(error);
    return res.json({success:false ,message:error.message});
}}



