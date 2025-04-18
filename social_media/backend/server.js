import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/ProfileRoute.js';
import uploadRoutes from './routes/uploadRoute.js';
import postRoutes from './routes/postRoutes.js'; // ⬅️ NEW
import reminderRoutes from './routes/reminderRoutes.js'; // ⬅️ NEW

dotenv.config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // ⬅️ NEW

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes); 
app.use('/api/posts', postRoutes); // ⬅️ NEW
app.use('/api/reminders', reminderRoutes); // ⬅️ NEW

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
