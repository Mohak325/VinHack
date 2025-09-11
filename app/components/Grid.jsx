import React from 'react';

const GridPlusBackground = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden" style={{ backgroundColor: '#D5D1BE' }}>
      {/* Grid lines background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c0bdab 1px, transparent 1px),
            linear-gradient(to bottom, #c0bdab 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      >
      </div>
      
      {/* Grid container for plus symbols */}
      <div className="absolute inset-0 grid grid-cols-5 gap-8 p-8">
        {/* Generate 50 plus symbols (5x10 grid) */}
        {Array.from({ length: 30 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-center"
          >
            <div
              className="text-md font-light select-none"
              style={{ color: '#ea8244' }}
            >
              +
            </div>
          </div>
        ))}
      </div>
      
      {/* Optional content overlay area */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
          <p className="text-gray-800 text-lg">Your content goes here</p>
        </div>
      </div>
    </div>
  );
};

export default GridPlusBackground;