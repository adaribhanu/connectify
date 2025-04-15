const Reminder = require('../models/reminderModel'); // Reminder model

// Controller for creating a new reminder
const createReminder = async (req, res) => {
  try {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new reminder
    const newReminder = new Reminder({
      title,
      date,
      time
    });

    // Save the reminder to the database
    const savedReminder = await newReminder.save();
    return res.status(201).json(savedReminder); // Return the saved reminder
  } catch (error) {
    console.error('Error saving reminder:', error);
    return res.status(500).json({ message: 'Error saving reminder' });
  }
};

module.exports = { createReminder };
