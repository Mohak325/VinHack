import React from 'react';

const Marquee = () => {
  return (
    <div className="relative w-full h-24 top-15 z-50 overflow-hidden flex items-center justify-center">
      {/* Diagonal marquee container */}
      <div 
        className="absolute w-[150vw] h-32 bg-orange-500 overflow-hidden border-4 border-black"
      >
        {/* Inner geometric border pattern */}
        <div className="absolute inset-2 border-2 border-black opacity-40"></div>
        
        {/* Top and bottom accent lines */}
        <div className="absolute top-1 left-4 right-4 h-0.5 bg-black opacity-60"></div>
        <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-black opacity-60"></div>
        
        {/* Shine effect overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
            animation: 'shine 3s ease-in-out infinite'
          }}
        ></div>
        
        {/* Moving text with geometric separation */}
        <div 
          className="absolute top-1/2 left-0 transform -translate-y-1/2 whitespace-nowrap text-black font-black text-4xl flex items-center"
          style={{
            animation: 'scrollDiagonal 12s linear infinite',
            textShadow: '3px 3px 0px rgba(0,0,0,0.1), -1px -1px 0px rgba(255,255,255,0.3)',
            fontFamily: 'Orbitron, monospace',
            letterSpacing: '0.25em'
          }}
        >
          <span className="relative">
            IMAGINE
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 border-4 border-black rotate-45 bg-orange-400"></div>
          </span>
          <span className="ml-16 relative">
            BUILD
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 border-4 border-black rotate-45 bg-orange-400"></div>
          </span>
          <span className="ml-16">
            TRANSFORM
          </span>
        </div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes scrollDiagonal {
          0% {
            transform: translateX(150vw) translateY(-50%);
          }
          100% {
            transform: translateX(-150%) translateY(-50%);
          }
        }
        
        @keyframes shine {
          0%, 100% { 
            opacity: 0.2; 
          }
          50% { 
            opacity: 0.6; 
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;