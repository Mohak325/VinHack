import React, { useState, useEffect } from "react";

const AnimatedLines = () => {
  const [lines, setLines] = useState(
    [...Array(12)].map(() => ({
      height: 30,
      width: 6,
      marginTop: 0,
      marginBottom: 0,
    }))
  );

  useEffect(() => {
    let wavePhase = 0;
    const lineResizeInterval = setInterval(() => {
      wavePhase += 0.2;
      const newLines = [...Array(12)].map((_, i) => {
        const center = 5.5;
        const dist = Math.abs(i - center);
        const wave = Math.sin(wavePhase - dist * 0.5);
        const height = 20 + (wave + 1) * 10;
        const totalHeight = 50;
        const topMargin = (totalHeight - height) / 2;
        return {
          width: 6,
          height,
          marginTop: topMargin,
          marginBottom: topMargin,
        };
      });
      setLines(newLines);
    }, 100);

    return () => clearInterval(lineResizeInterval);
  }, []);

  return (
    <div className="mt-5 md:mt-0 flex justify-center relative z-10 w-full">
      <div className="flex space-x-2 items-center" style={{ height: "50px" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="bg-[#E86100] opacity-70 transition-all duration-100 ease-out rounded-sm"
            style={{
              width: `${line.width}px`,
              height: `${line.height}px`,
              marginTop: `${line.marginTop}px`,
              marginBottom: `${line.marginBottom}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLines;
