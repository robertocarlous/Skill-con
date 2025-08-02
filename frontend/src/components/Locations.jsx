import React, { useState } from "react";
import dot from "@/assets/image/dot.jpeg";

const states = [
  "Lagos",
  "Ibadan",
  "Portharcourt",
  "Abuja",
  "Jos",
  "Uyo",
  "Calabar",
  "Benin",
  "Ilorin",
  "Ogun",
];

const StateSelector = () => {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="rounded-md p-4 flex flex-wrap gap-4 justify-center max-w-2xl mx-auto sm:mb-10">
      {states.map((state) => (
        <button
          key={state}
          onClick={() => setSelectedState(state)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md border-2 border-[#275DB0] transition-all duration-200 hover:shadow-md ${
            selectedState === state
              ? "bg-[#275DB0] text-white"
              : "bg-white text-black hover:bg-blue-50"
          }`}
        >
          <img src={dot} alt="location icon" className="w-4 h-4" />
          <span>{state}</span>
        </button>
      ))}
    </div>
  );
};

export default StateSelector;
