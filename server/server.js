import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js'
import itemRoutes from "./routes/itemRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

connectDB();

app.use('/api/item', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res)=>{
    res.send("hello world!!");
})

app.listen(port, ()=>{
    console.log(`server is started on port:${port}`);
})