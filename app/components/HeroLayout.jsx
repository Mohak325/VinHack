import React from "react";

const HeroLayout = ({ children }) => {
  return (
    <div className="relative w-full h-full p-4">
      {/* Black border with cutout corners */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          clipPath:
            "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
        }}
      ></div>

      {/* Corner Fills to cover the space left by clip-path */}
      <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute bottom-0 left-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black"></div>

      {/* Inner content container with matching cutout shape */}
      <div
        className="relative w-full h-full bg-[#D5D1BE]"
        style={{
          clipPath:
            "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HeroLayout;
