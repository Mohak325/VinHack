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
          backgroundSize: "20px 20px", // Smaller grid on mobile
        }}
      ></div>

      {/* Medium screens and up - use larger grid */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c0bdab 1px, transparent 1px),
            linear-gradient(to bottom, #c0bdab 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Grid container for plus symbols - Mobile: 3x4 grid, Desktop: 5x6 grid */}
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 p-4 md:p-8">
        {/* Generate 12 plus symbols for mobile (3x4), 30 for desktop (5x6) */}
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className={`flex items-center justify-center ${index >= 12 ? 'hidden md:flex' : ''}`}>
            <div
              className="text-sm md:text-md font-light select-none"
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
