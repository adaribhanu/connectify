// routes/postRoutes.js
import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

// GET posts by username
// routes/posts.js
router.get('/:username', async (req, res) => {
    try {
      const posts = await Post.find({ username: req.params.username }).sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });
  

export default router;
