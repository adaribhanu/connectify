// routes/ProfileRouter.js
import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// POST /api/profile/userSetup
router.post('/userSetup', async (req, res) => {
  const { name, username, email, dob, bio, location, profession, phone, profilePic } = req.body;

  try {
    let profile = await Profile.findOne({ email }); // check by email instead of username

    if (profile) {
      profile.name = name;
      profile.username = username;
      profile.dob = dob;
      profile.bio = bio;
      profile.location = location;
      profile.profession = profession;
      profile.phone = phone;
      profile.profilePic = profilePic;

      await profile.save();
      return res.status(200).json({ message: 'Profile updated', profile });
    }

    profile = new Profile({ name, username, email, dob, bio, location, profession, phone, profilePic });
    await profile.save();
    res.status(201).json({ message: 'Profile created', profile });

  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/profile/byEmail/:email
router.get('/byEmail/:email', async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
