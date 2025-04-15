import React, { useEffect, useState } from "react";
import axios from "axios";

function SuggestionsList() {
  const [suggestions, setSuggestions] = useState([]);
  const [visibleSuggestions, setVisibleSuggestions] = useState(2); // Initially show 2 suggestions
  const [showAll, setShowAll] = useState(false); // Track if all suggestions are shown

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile/suggestions")
      .then((res) => setSuggestions(res.data))
      .catch((err) => console.error("Suggestions fetch failed:", err));
  }, []);

  const handleSeeAllClick = () => {
    setShowAll((prevState) => !prevState);
    setVisibleSuggestions(showAll ? 2 : suggestions.length);
  };

  return (
    <div className="bg-white rounded-[10px] p-4 shadow-md">
      <div className="flex justify-between text-gray-600 font-semibold mb-2">
        <span>Suggestions</span>
        <span
          className="text-xs cursor-pointer"
          onClick={handleSeeAllClick}
        >
          {showAll ? "See Less" : "See All"}
        </span>
      </div>

      {/* Suggestions list */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          showAll ? "max-h-[1000px]" : "max-h-[300px]"
        }`}
      >
        {suggestions.slice(0, visibleSuggestions).map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={user.profilePic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.username}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <button className="text-white bg-red-500 text-xs px-2 py-1 cursor-pointer rounded font-bold">
                + Follow
              </button>
              <button className="text-red-500 text-xs px-2 py-1 bg-white cursor-pointer rounded font-bold">
                × Ignore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestionsList;
