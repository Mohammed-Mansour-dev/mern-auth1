
import jwt from 'jsonwebtoken';


//  !GET USER ID FROM TOKEN
export const userAuth =async (req ,res , next) =>{

    // get the token from cookies
   const { token } = req.cookies;
if(!token){
    return res.json({success:false, message:"Not Authorized .Login Again."});
}

try {

    // decode the token and return the user id
const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET);
if(!tokenDecoded){
    return res.json({success:false, message:"Token is not valid. Login again"});
}else {
    req.body.userId = tokenDecoded.id;

}


next();
    
} catch (error) {
    console.log(error);
    return res.json({success:false, message:error.message});
}
}



















