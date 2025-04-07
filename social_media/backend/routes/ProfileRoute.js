import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();
// POST /api/user/userSetup
router.post('/userSetup', async (req, res) => {
  const {
    name,
    username,
    dob,
    bio,
    location,
    profession,
    phone,
    profilePic
  } = req.body;

  try {
    // Check if username already exists
    let profile = await Profile.findOne({ username });

    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.dob = dob;
      profile.bio = bio;
      profile.location = location;
      profile.profession = profession;
      profile.phone = phone;
      profile.profilePic = profilePic;

      await profile.save();
      return res.status(200).json({ message: 'Profile updated', profile });
    }

    // Create new profile
    profile = new Profile({
      name,
      username,
      dob,
      bio,
      location,
      profession,
      phone,
      profilePic
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created', profile });

  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
