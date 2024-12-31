import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verifyOTP:{
    type: String,
    default: "",
  },
  OTPExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified:{
    type: Boolean,
    default: false,
  },
  resetOTP:{
    type: String,
    default: "",
  },
  resetOTPExpireAt: {
    type: Number,
    default: 0,
  },
});


const UserModel = mongoose.models.User || mongoose.model("User",userSchema);

export default UserModel;

