import express from 'express';
import Reminder from '../models/reminderModel.js';

const router = express.Router();

// GET reminders by userId (instead of username)
router.get('/:userId', async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new reminder (using userId)
router.post('/:userId', async (req, res) => {
  const { title, date } = req.body;

  try {
    const reminder = new Reminder({
      userId: req.params.userId,
      title,
      date,
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
