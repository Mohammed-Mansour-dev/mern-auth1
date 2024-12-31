
import nodemailer from "nodemailer"

export const transporter =nodemailer.createTransport({
    host:process.env.SMTP_SENDER,
    port:465,
    auth:{
        user:process.env.EMAIL_SENDER,
        pass:process.env.SMTP_PW
    }
});






