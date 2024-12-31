import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors"
import ConnectDB from "./config/MongoDB.js";
import authRouter from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";



const app = express();
const PORT =process.env.PORT || 4455;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:process.env.FRONTEND_URLS.split(",") , credentials:true}));

ConnectDB();

// endpoints
app.get('/', (req, res) => {
    res.send("Hello from the server!");
})
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

// wipezvetubhcksng

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});




