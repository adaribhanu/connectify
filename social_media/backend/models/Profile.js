// models/Profile.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date },
  bio: { type: String },
  location: { type: String },
  profession: { type: String },
  phone: { type: String },
  profilePic: { type: String }
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
