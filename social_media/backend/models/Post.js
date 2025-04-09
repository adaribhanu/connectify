// models/Post.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  username: String,
  caption: String,
  image: String,
  likes: { type: Number, default: 0 },
  date: String,
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
