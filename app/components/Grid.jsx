import React from "react";

const GridPlusBackground = ({ children }) => {
  return (
    <div className="w-full relative" style={{ backgroundColor: "#D5D1BE" }}>
      {/* Grid lines background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c0bdab 1px, transparent 1px),
            linear-gradient(to bottom, #c0bdab 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Grid container for plus symbols */}
      <div className="absolute inset-0 grid grid-cols-5 gap-8 p-8">
        {/* Generate 30 plus symbols (5x6 grid) */}
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              className="text-md font-light select-none"
              style={{ color: "#ea8244" }}
            >
              +
            </div>
          </div>
        ))}
      </div>

      {/* Content overlay area - This is where the children will be rendered */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridPlusBackground;
