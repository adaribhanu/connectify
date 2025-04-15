import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// POST /api/profile/userSetup
router.post('/userSetup', async (req, res) => {
  const { name, username, email, dob, bio, location, profession, phone, profilePic } = req.body;

  try {
    let profile = await Profile.findOne({ email });

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

// 🔥 NEW: GET /api/profile/suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const profiles = await Profile.find({}, 'name username profilePic dob');
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// GET /api/profile/upcoming-birthdays
router.get('/upcoming-birthdays', async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear();
    const next7Days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      next7Days.push({ month: date.getMonth() + 1, day: date.getDate() });
    }

    const profiles = await Profile.find({ dob: { $ne: null } });

    const upcoming = profiles.filter(profile => {
      const dob = new Date(profile.dob);
      const month = dob.getMonth() + 1;
      const day = dob.getDate();
      return next7Days.some(d => d.month === month && d.day === day);
    });

    res.json(upcoming);
  } catch (err) {
    console.error("Error fetching upcoming birthdays:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



export default router;
