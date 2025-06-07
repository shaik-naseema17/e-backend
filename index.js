import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import itemRoutes from './routes/item.js';
import userRoutes from './routes/user.js';
import tradeRoutes from "./routes/trade.js";
import { fileURLToPath } from 'url';

// ✅ Initialize app before using it
const app = express(); 

// ✅ Fix __dirname usage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "https://e-frontend1.onrender.com",
];

// ✅ CORS middleware applied correctly
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// ✅ Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/items", itemRoutes);
app.use("/auth", userRoutes);
app.use('/api/trades', tradeRoutes);

// ✅ MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
