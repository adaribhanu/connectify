import express from 'express';
import Post from '../models/Post.js';
import Profile from '../models/Profile.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Utility function to format createdAt
const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = (now - new Date(date)) / 1000; // seconds
  if (diff < 60) return `${Math.floor(diff)} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return new Date(date).toLocaleDateString();
};

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const enhancedPosts = await Promise.all(
      posts.map(async (post) => {
        const profile = await Profile.findOne({ username: post.username });
        return {
          ...post.toObject(),
          profilePic: profile?.profilePic || null,
          date: formatTimeAgo(post.createdAt),
        };
      })
    );

    res.json(enhancedPosts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get posts by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await Post.find({ username }).sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ error: 'No posts found for this user' });
    }

    const profile = await Profile.findOne({ username });

    const enhancedPosts = posts.map((post) => ({
      ...post.toObject(),
      profilePic: profile?.profilePic || null,
      date: formatTimeAgo(post.createdAt),
    }));

    res.json(enhancedPosts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts for user' });
  }
});

// DELETE post by ID and remove uploaded image
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the image file if it exists
    if (post.image) {
      const imagePath = path.join(process.cwd(), post.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err.message);
        } else {
          console.log('Image deleted:', imagePath);
        }
      });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post and image deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
