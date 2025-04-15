import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BirthdaysList() {
  const [birthdaysToday, setBirthdaysToday] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const res = await axios.get("/api/profile/suggestions");

        const today = new Date();
        const todayMonth = today.getMonth(); // 0-indexed (Jan = 0)
        const todayDate = today.getDate();

        // Filter today's birthdays
        const birthdaysToday = res.data.filter((profile) => {
          if (!profile.dob) return false;
          const dob = new Date(profile.dob);
          return dob.getMonth() === todayMonth && dob.getDate() === todayDate;
        });

        setBirthdaysToday(birthdaysToday);

        // Filter upcoming birthdays (after today)
        const upcomingBirthdays = res.data.filter((profile) => {
          if (!profile.dob) return false;
          const dob = new Date(profile.dob);
          // Make sure the birthday is after today
          return (
            (dob.getMonth() === todayMonth && dob.getDate() > todayDate)
          );
        });

        setUpcomingBirthdays(upcomingBirthdays);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchBirthdays();
  }, []);

  const formatDateOfBirth = (dob) => {
    const date = new Date(dob);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-[10px] p-4 shadow-md">
      <div className="text-gray-500 text-sm mb-2">🎂 Birthdays Today</div>
      {birthdaysToday.length === 0 ? (
        <div className="text-sm text-gray-400">No birthdays today.</div>
      ) : (
        birthdaysToday.map((bday, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-lg p-2 flex items-center justify-between mb-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={bday.profilePic || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-bold">{bday.name}</div>
                <div className="text-xs text-gray-500">{bday.username}</div>
              </div>
            </div>
            <button className="text-gray-600 text-lg">🥳</button>
          </div>
        ))
      )}

      {/* Upcoming Birthdays */}
      <div className="text-gray-500 text-sm mb-2 mt-4">🎉 Upcoming Birthdays</div>
      {upcomingBirthdays.length === 0 ? (
        <div className="text-sm text-gray-400">No upcoming birthdays.</div>
      ) : (
        upcomingBirthdays.map((bday, idx) => {
          const dobFormatted = formatDateOfBirth(bday.dob);
          return (
            <div
              key={idx}
              className="bg-blue-50 rounded-lg p-2 flex items-center justify-between mb-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={bday.profilePic || "https://via.placeholder.com/40"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-bold">{bday.name}</div>
                  <div className="text-xs text-gray-500">{bday.username}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{dobFormatted}</div>
            </div>
          );
        })
      )}
    </div>
  );
}
