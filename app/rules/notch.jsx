import React, { useState, useEffect } from "react";

// A small component for the animated sound waves
const SoundWaves = ({ soundOn }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!soundOn) {
      // Static, bulging lines when sound is off
      const totalHeight = 16;
      const staticLines = [...Array(12)].map((_, i) => {
        const center = 5.5;
        const dist = Math.abs(i - center);
        const height = 4 + 8 * Math.max(0, 1 - dist / 3.5);
        const margin = (totalHeight - height) / 2;
        return {
          width: 2,
          height: height,
          marginTop: margin,
          marginBottom: margin,
        };
      });
      setLines(staticLines);
      return;
    }

    // Animated lines when sound is on
    let wavePhase = 0;
    const interval = setInterval(() => {
      wavePhase += 0.2;
      const newLines = [...Array(12)].map((_, i) => {
        const center = 5.5;
        const dist = Math.abs(i - center);
        const wave = Math.sin(wavePhase - dist * 0.5);
        const height = 8 + (wave + 1) * 4;
        const totalHeight = 20;
        const topMargin = (totalHeight - height) / 2;
        return {
          width: 2,
          height,
          marginTop: topMargin,
          marginBottom: topMargin,
        };
      });
      setLines(newLines);
    }, 100);

    return () => clearInterval(interval);
  }, [soundOn]);

  return (
    <div className="flex justify-center items-center w-14 h-[16px]">
      {lines.map((line, i) => (
        <div
          key={i}
          className="bg-[#E86100] opacity-80 rounded-sm transition-all duration-100 ease-out mx-px"
          style={{
            width: `${line.width}px`,
            height: `${line.height}px`,
            marginTop: `${line.marginTop}px`,
            marginBottom: `${line.marginBottom}px`,
          }}
        />
      ))}
    </div>
  );
};

const Notch = ({ position, soundOn, onToggleSound, onToggleMenu, tokens }) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "top-4 left-1/2 -translate-x-1/2 h-8 md:h-10 w-40 md:w-64";
      case "right":
        return "top-1/2 right-3 -translate-y-1/2 w-7 h-72";
      case "left":
        return "top-1/2 left-3 -translate-y-1/2 w-7 h-72";
      case "bottom":
        return "bottom-3.5 left-1/2 -translate-x-1/2 h-5 md:h-7 w-40";
      default:
        return "";
    }
  };

  const getClipPath = () => {
    switch (position) {
      case "top":
        return "polygon(0 0, 100% 0, 85% 100%, 15% 100%)";
      case "right":
        return "polygon(0 15%, 100% 0, 100% 100%, 0 85%)";
      case "left":
        return "polygon(0 0, 100% 15%, 100% 85%, 0 100%)";
      case "bottom":
        return "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)";
      default:
        return "";
    }
  };

  const baseClasses = "absolute bg-black flex justify-center items-center z-20";
  const positionClasses = getPositionClasses();
  const clipPathStyle = { clipPath: getClipPath() };

  const renderContent = () => {
    switch (position) {
      case "top":
        return (
          <div
            className="relative bottom-1 w-[95%] h-[80%] flex justify-center items-center"
            style={{
              backgroundColor: "#8F3C00",
              clipPath: "polygon(5% 0, 95% 0, 85% 100%, 15% 100%)",
            }}
          >
            <button
              onClick={onToggleSound}
              className="flex items-center justify-center w-full h-full text-xs md:text-sm tracking-widest hover:opacity-80 transition-opacity"
              style={{ color: "#F5B37F" }}
              type="button"
            >
              <div className="flex items-center">
                <SoundWaves soundOn={soundOn} />
                <div className="w-12 text-left pl-2">
                  <span>[{soundOn ? "ON" : "OFF"}]</span>
                </div>
              </div>
            </button>
          </div>
        );
      case "right":
        return (
          <button
            onClick={onToggleMenu}
            className="text-xs md:text-sm tracking-widest rotate-90 hover:opacity-70 transition-opacity"
            style={{ color: "#F5B37F" }}
          >
            MENU
          </button>
        );
      case "left":
        return (
          <div
            className="flex flex-col left-0.5 gap-y-0.5 items-start text-xs md:text-sm tracking-widest"
            style={{ color: "#F5B37F" }}
          >
            {tokens?.map((t, i) => (
              <span key={i} className="leading-tight">
                {t}
              </span>
            ))}
          </div>
        );
      case "bottom":
        return (
          <a
            href="/"
            className="text-xs md:text-sm tracking-widest font-bold hover:opacity-70 transition-opacity"
            style={{ color: "#F5B37F" }}
          >
            BACK
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${baseClasses} ${positionClasses}`} style={clipPathStyle}>
      {renderContent()}
    </div>
  );
};

export default Notch;
