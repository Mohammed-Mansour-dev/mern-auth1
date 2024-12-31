import express from 'express';
import { isAuthenticated, login, logout, register, sendOTP, sendResetPasswordOTP, verifyOTP, verifyResetPassword } from '../controllers/authController.js';
import { userAuth } from '../middleware/userAuth.js';



const authRouter =express.Router();



// routes
authRouter.post('/register',register)
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendOTP);
authRouter.post('/verify-otp', userAuth,verifyOTP);
authRouter.post('/is-authenticated', userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetPasswordOTP);
authRouter.post('/verify-reset-otp',verifyResetPassword);

export default authRouter
