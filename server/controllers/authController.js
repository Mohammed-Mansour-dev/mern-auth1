import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { transporter } from "../config/Nodemailer.js";





// !register function
export const register = async (req,res) =>{
    const {name,email,password} = req.body;
    // check if details are available
    if(!name || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
    }

        try {
    // check if email already exists
    const existingUser = await UserModel.findOne({email});
    if(existingUser){
        return res.json({success:false,msg: "Email already exists"});
    }

// hash the password
const hashedPassword = await bcrypt.hash(password ,10)

    // create new user
    const newUser = new UserModel({name,email,password: hashedPassword});

    await newUser.save();

// creatre token 
const token =  jwt.sign({id: newUser._id} ,  process.env.JWT_SECRET, {expiresIn:"7d"} )

res.cookie("token", token ,{
    httpOnly: true,
    secure:process.env.NODE_ENV !== "production",
    sameSite: process.env.NODE_ENV === "production"? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
})


// send email to registered users
const mailOptions ={
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "Welcome to MOHAMMED DEVELOPMENT ORGANIZATION",
    text: "Thank you for visiting our website. Your account has been registered with email id: " + email
}
await transporter.sendMail(mailOptions)


return res.json({success: true, message:"register successfully"});

    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message});
     }
}

// !login function
export const login = async (req, res) => {

// check coming credentials
const {email  ,password} =req.body;
if(!email ||!password) {
return res.json({success: false,message:"Missing email or password"});
}
try {
    // check if user exisits
const user = await UserModel.findOne({email})
if(!user) return res.json({success: false,message: "User not found"});

// check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.json({success: false, message: "Invalid credentials"});


// creatre token 
const token =  jwt.sign({id: user._id} ,  process.env.JWT_SECRET, {expiresIn:"7d"} )

res.cookie("token", token ,{
    httpOnly: true,
    secure:process.env.NODE_ENV !== "production",
    sameSite:"none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
})
return res.json({success: true});

} catch (error) {
    console.log(error);
    res.json({success: false,message:error.message});
}


}

// !logout function
export const logout =async (req ,res)=>{
    try {
        
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV!== "production",
            sameSite: process.env.NODE_ENV === "production"? "none" : "strict",
        });

        return res.json({success: true ,message:"logged out successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message});
    }
}

// !send otp verification to user's email address
export const sendOTP = async (req, res) => {

try {
    
const {userId} =req.body;
if(!userId) return res.json({success: false,message:"useriD not found"});

// get the user
const user = await UserModel.findById(userId);
// check if the user is already authenticated
if(user.isAccountVerified) return res.json({success: false,message:"Account is already verified"})


// making OTP 
const otp = String(Math.floor(100000 + Math.random()  * 900000));
// setting otp & expire date in db 
user.verifyOTP =otp;
user.OTPExpireAt = Date.now() + 24 * 60  * 60 * 1000; // 24 day minutes
await user.save();

// sending otp to user's email
const mailOptions ={
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Verification Code",
    html: `
    <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="color: #333;">Verify account code Request</h2>
                <p style="font-size: 16px; color: #555;">Hi ${user.name || 'User'},</p>
                <p style="font-size: 16px; color: #555;">We received a request to verify your account. Please use the OTP below to proceed:</p>
                <div style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #4CAF50; color: white; font-size: 24px; font-weight: bold; border-radius: 5px;">
                    ${otp}
                </div>
                <p style="font-size: 16px; color: red; margin-top: 20px;">The OTP is valid for 24 hours.</p>
                <p style="font-size: 14px; color: #777;">If you didn’t request a password reset, please ignore this email.</p>
                <p style="font-size: 14px; color: #777;">Thanks,</p>
                <p style="font-size: 14px; color: #777;">The Team</p>
            </div>
        </body>
    </html>
`
} 
await transporter.sendMail(mailOptions);


return res.json({success: true, message:"OTP sent to your email successfully"});

} catch (error) {
    console.log(error.message);
    return res.json({success: false,message:error.message});
}
}

// !verify OTP
export const verifyOTP = async (req, res) => {

try {
    // get & check OTP & userid
const {userId, otp} =req.body;
console.log("userid: " + userId + otp)
if (!userId || !otp) return res.json({success: false,message:"Missing details"});

// get user
const user = await UserModel.findById(userId);
if(!user) return res.json({success: false,message:"User not found"});

// check OTP
if(otp !== user.verifyOTP || otp === ""){
    return res.json({success: false,message:"Invalid OTP"});
}

// check if OTP is expired
if(Date.now() > user.OTPExpireAt){
    return res.json({success: false,message:"OTP expired"});
}

// set & delete values from db
user.isAccountVerified = true;
user.verifyOTP ="";
user.OTPExpireAt =0;

await user.save();

return res.json({success:true,message:"account verified successfully"}); 

} catch (error) {
    console.log(error.message);
    return res.json({success: false,message:error.message});
}
}


// !is user authenticated by checking a cookie by middleware
export const isAuthenticated =async (req ,res) =>{
    try {
        return res.json({success:true,message:"user is authenticated"});
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:error.message});
    }
}


// !send otp reset password'
    export const sendResetPasswordOTP = async (req, res) => {
    
    try {
        // get the email
    const {email} =req.body;
    if(!email) return res.json({success: false,message:"email is required"});

    // get the user
    const user = await UserModel.findOne({email});
    // check if the user is existing
    if(!user) return res.json({success: false,message:"User is not found"})
   

// making reset OTP 
const otp = String(Math.floor(100000 + Math.random()  * 900000));
// setting otp & expire date in db 
user.resetOTP =otp;
user.resetOTPExpireAt = Date.now() + 24 * 60  * 60 * 1000; // 24 day minutes
await user.save();

// sending reset otp to user's email
const mailOptions ={
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Reset OTP ",
    html: `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p style="font-size: 16px; color: #555;">Hi ${user.name || 'User'},</p>
                    <p style="font-size: 16px; color: #555;">We received a request to reset your password. Please use the OTP below to proceed:</p>
                    <div style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #4CAF50; color: white; font-size: 24px; font-weight: bold; border-radius: 5px;">
                        ${otp}
                    </div>
                    <p style="font-size: 16px; color: red; margin-top: 20px;">The OTP is valid for 15 minutes.</p>
                    <p style="font-size: 14px; color: #777;">If you didn’t request a password reset, please ignore this email.</p>
                    <p style="font-size: 14px; color: #777;">Thanks,</p>
                    <p style="font-size: 14px; color: #777;">The Team</p>
                </div>
            </body>
        </html>
    `
};

await transporter.sendMail(mailOptions);


return res.json({success: true, message:"Reset OTP sent to your email successfully"});


   
    } catch (err) {
        console.error(err.message);
        return res.json({success:false, message:err.message})
} }

// !verify otp reset  password
export const verifyResetPassword = async (req ,res)=>{
// get credentials
const {email ,otp ,newPassword} = req.body;
if(!email ,!otp ,!newPassword) return res.json({success:false, message:"email ,otp ,newPassword are required"});

try {

// get user 
    const user = await UserModel.findOne({email});
    if(!user) return res.json({success: false, message:"User not found"});

// check resetOtp if expired
if(user.resetOTPExpireAt < Date.now()) return res.json({success:false, message:"resetOTP expired"});

// check otp value 
if(otp === "" || otp !== user.resetOTP )return res.json({success:false, message:"invalid OTP "});

    // hashed password
const hashedPassword =await bcrypt.hash(newPassword, 10);

// set in db
    user.resetOTP = "";
    user.resetOTPExpireAt = 0;
    user.password = hashedPassword;
    await user.save();

    return res.json({success:true, message:"password reset successfully"});


} catch (error) {
    console.log(error);
    return res.json({success: false, message:error.message});
}



}
