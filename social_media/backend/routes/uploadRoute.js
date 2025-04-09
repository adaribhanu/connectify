import express from "express";
import multer from "multer";
import Post from "../models/Post.js";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { caption, username } = req.body;
    const image = req.file ? req.file.path : "";

    const newPost = new Post({ caption, image, username });
    await newPost.save();

    res.status(201).json({ 
      message: "Post uploaded", 
      post: newPost, 
      imageUrl: newPost.image 
    });
    
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
