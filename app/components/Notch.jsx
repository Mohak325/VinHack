"use client";
import React, { useState, useEffect, useRef } from "react";

const Notch = ({ type, soundOn, onToggle, coords, fontClassName }) => {
  const [lines, setLines] = useState([]);
  const lineCount = 19;

  const animationFrameId = useRef(null);
  const transitionStartTime = useRef(null);
  const startLines = useRef([]);

  const staticLines = React.useMemo(() => {
    return [...Array(lineCount)].map((_, i) => {
      let height = 4;
      if (i >= 6 && i <= 12) {
        const centerIndex = 9;
        const distFromCenter = Math.abs(i - centerIndex);
        height = 6 + 6 * Math.max(0, 1 - distFromCenter / 4);
      }
      return { height };
    });
  }, []);

  useEffect(() => {
    if (type !== "sound") return;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    if (soundOn) {
      // --- STATE 1: ANIMATION IS "ON" --- (This part is mostly the same)
      let wavePhase = 0;
      const animateOn = () => {
        // ... (your existing animation logic for the "on" state)
        wavePhase += 0.15;
        const newLines = [...Array(lineCount)].map((_, i) => {
          if (i <= 1 || i >= 17) return { height: 4 };
          const centerIndex = 9;
          const distFromCenter = Math.abs(i - centerIndex);
          const wave1 = Math.sin(wavePhase - distFromCenter * 0.5);
          const wave2 = Math.sin(wavePhase * 0.5 + distFromCenter * 0.8);
          const bulgeFactor = 1 - distFromCenter / 8;
          const combinedWave = (wave1 + wave2) / 2;
          const minHeight = 6;
          const maxHeight = 16;
          const dynamicHeight =
            (maxHeight - minHeight) * ((combinedWave + 1) / 2);
          const height = minHeight + dynamicHeight * bulgeFactor;
          return { height };
        });
        setLines(newLines);
        animationFrameId.current = requestAnimationFrame(animateOn);
      };
      animateOn();
    } else {
      // --- STATE 2: TRANSITIONING TO "OFF" --- (This is the new logic)
      if (lines.length === 0) {
        setLines(staticLines);
        return;
      }

      startLines.current = lines; // Capture current heights
      transitionStartTime.current = performance.now();
      const transitionDuration = 400; // 400ms transition

      const animateOff = (now) => {
        const elapsedTime = now - transitionStartTime.current;
        const progress = Math.min(elapsedTime / transitionDuration, 1);

        const transitioningLines = startLines.current.map((startLine, i) => {
          const endHeight = staticLines[i].height;
          const startHeight = startLine.height;
          const height = startHeight + (endHeight - startHeight) * progress;
          return { height };
        });

        setLines(transitioningLines);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animateOff);
        } else {
          setLines(staticLines); // Ensure final state is clean
        }
      };
      animationFrameId.current = requestAnimationFrame(animateOff);
    }

    // --- CLEANUP ---
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [soundOn, type, staticLines]); // Add staticLines to the dependency array

  const tokenizeCoords = (x, y) => {
    const formatNum = (num) => num.toString().padStart(4, "0").split("");
    return ["X.", ...formatNum(x), "//", "Y.", ...formatNum(y)];
  };

  const tokens = coords ? tokenizeCoords(coords.x, coords.y) : [];

  const baseClasses = "absolute z-20 flex justify-center items-center";
  const textClasses = `text-xs md:text-sm tracking-widest transition-opacity ${fontClassName}`;
  const textColor = { color: "#F5B37F" };

  switch (type) {
    case "sound":
      return (
        <div
          className={`${baseClasses} top-4 left-1/2 -translate-x-1/2 h-8 md:h-10 w-50 md:w-64 bg-black fixed`}
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
        >
          <div
            className="relative bottom-1 w-[95%] h-[80%] flex justify-center items-center"
            style={{
              backgroundColor: "#8F3C00",
              clipPath: "polygon(5% 0, 95% 0, 85% 100%, 15% 100%)",
            }}
          >
            <button
              onClick={onToggle}
              className={`flex items-center justify-center w-full h-full hover:opacity-80 ${textClasses}`}
              style={textColor}
              type="button"
            >
              <div className="flex items-center">
                <div className="flex justify-center items-center w-20 h-[16px]">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className="bg-[#E86100] opacity-80 rounded-sm mx-px"
                      style={{
                        width: `2px`, // Using a whole pixel value for consistency
                        height: `${line.height}px`,
                      }}
                    />
                  ))}
                </div>
                <div className="w-12 text-left pl-2">
                  <span>[{soundOn ? "ON" : "OFF"}]</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      );
    case "menu":
      return (
        <div
          className={`${baseClasses} top-1/2 fixed right-3 -translate-y-1/2 w-7 h-72 bg-black`}
          style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)" }}
        >
          <button
            onClick={onToggle}
            className={`${textClasses} flex flex-col items-center justify-center h-full w-full hover:opacity-70`}
            style={textColor}
          >
            {"MENU".split("").map((char, i) => (
              <span key={i} className="leading-tight tracking-widest">
                {char}
              </span>
            ))}
          </button>
        </div>
      );
    case "coords":
      return (
        <div
          className={`${baseClasses} top-1/2 fixed left-3 -translate-y-1/2 w-7 h-72 bg-black`}
          style={{ clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)" }}
        >
          <div
            className={`flex flex-col left-0.5 gap-y-0.5 items-start ${textClasses}`}
            style={textColor}
          >
            {tokens.map((t, i) => (
              <span key={i} className="leading-tight">
                {t}
              </span>
            ))}
          </div>
        </div>
      );
    case "discover":
      return (
        <div
          className={`${baseClasses} bottom-3.5 left-1/2 -translate-x-1/2 h-5 md:h-7 w-40 bg-black rounded-t-xl`}
          style={{
            clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <a
            href="#discover"
            className={`${textClasses} hover:opacity-70`}
            style={textColor}
          >
            DISCOVER
          </a>
        </div>
      );
    case "border":
      return (
        <div className="absolute inset-0 w-full h-full p-4">
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
          <div
            className="relative w-full h-full bg-[#D5D1BE]"
            style={{
              clipPath:
                "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
            }}
          ></div>
        </div>
      );
    default:
      return null;
  }
};

export default Notch;