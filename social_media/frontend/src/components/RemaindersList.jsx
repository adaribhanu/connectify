import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RemindersList({ userId, showActions = true, onDeleteReminder }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reminders when the component mounts or userId changes
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const id = userId || JSON.parse(localStorage.getItem("userInfo"))?.userId;
        if (!id) return;
  
        setLoading(true);
        const response = await axios.get(`/api/reminders/${id}`);
        console.log("Fetched reminders response:", response.data);
        setReminders(response.data);
      } catch (err) {
        setError('Error fetching reminders');
        console.error('Error fetching reminders:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReminders();
  }, [userId]);
  
  const handleDeleteReminder = (id) => {
    if (onDeleteReminder) {
      onDeleteReminder(id);
    }
  };

  return (
    <div className="mb-4 bg-white rounded-[10px] p-4 shadow-md">
      <div className="flex justify-between text-gray-600 font-semibold mb-2">
        <span>Reminders</span>
        <span className="text-xs cursor-pointer">See All</span>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {reminders.length > 0 ? (
        reminders.map((reminder) => (
          <div key={reminder._id || reminder.id} className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{reminder.avatar || '🔔'}</span>
              <div>
                <div className="text-sm font-bold">{reminder.title}</div>
                <div className="text-xs text-gray-500">{new Date(reminder.date).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Conditional action buttons */}
            {showActions && (
              <div className="flex flex-col space-y-1">
                <button className="text-white bg-red-500 text-xs px-2 py-1 rounded">+ Follow</button>
                <button
                  onClick={() => handleDeleteReminder(reminder._id || reminder.id)}
                  className="text-red-500 text-xs px-2 py-1"
                >
                  × Ignore
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No reminders to show</div>
      )}
    </div>
  );
}

export default RemindersList;
