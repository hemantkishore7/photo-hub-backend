import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url"
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js"
import userRouter from "./routes/users.js"
import postRouter from "./routes/posts.js"
// import User from "./models/Users.js";
// import Post from "./models/Post.js";
// import {users,posts} from "./data/data.js"


// Configration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,"public/assets")))


// File storage
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
   filename: function(req,file,cb){
    cb(null,file.originalname)
   } 
})
const upload = multer({storage})

//Routes with Files
app.post("/auth/register",upload.single("picture"),register)

//Routers
app.use("/auth",authRoutes)
app.use("/users",userRouter)
app.use("/post",postRouter);

// Mongoose setup 
const port = process.env.PORT || 6000;
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(port,()=>console.log(`Server connected on ${port}`))

    // User.insertMany(users);
    // Post.insertMany(posts)
}).catch((error)=> console.log(`${error} did not connect DB`))