"use client";

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import SlidingMenu from "./SlidingMenu";

const BorderContext = createContext();

export const useBorder = () => useContext(BorderContext);

const Notch = ({ type, fontClassName, className }) => {
  const { soundOn, setSoundOn, isMenuOpen, setIsMenuOpen, coords } =
    useContext(BorderContext);
  const onToggle = (toggleType) => {
    if (toggleType === "sound") {
      setSoundOn((s) => !s);
    } else if (toggleType === "menu") {
      setIsMenuOpen((o) => !o);
    }
  };

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
      let wavePhase = 0;
      const animateOn = () => {
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
      if (lines.length === 0) {
        setLines(staticLines);
        return;
      }
      startLines.current = lines;
      transitionStartTime.current = performance.now();
      const transitionDuration = 400;

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
          setLines(staticLines);
        }
      };
      animationFrameId.current = requestAnimationFrame(animateOff);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [soundOn, type, staticLines]);

  const tokenizeCoords = (x, y) => {
    const formatNum = (num) => num.toString().padStart(4, "0").split("");
    return ["X.", ...formatNum(x), "//", "Y.", ...formatNum(y)];
  };

  const tokens = coords ? tokenizeCoords(coords.x, coords.y) : [];
  const baseClasses = "fixed z-52 flex justify-center items-center";
  const textClasses = `text-[10px] xs:text-xs md:text-sm tracking-widest transition-opacity ${fontClassName}`;
  const textColor = { color: "#F5B37F" };

  switch (type) {
    case "sound":
      return (
        <div className={`${baseClasses} ${className}`}>
          <div
            className={`${baseClasses} top-2 md:top-4 left-1/2 -translate-x-1/2 h-6 md:h-8 lg:h-10 w-40 md:w-50 lg:w-64 bg-black`}
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
                onClick={() => onToggle("sound")}
                className={`flex items-center justify-center w-full h-full hover:opacity-80 ${textClasses}`}
                style={textColor}
                type="button"
              >
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-16 md:w-20 h-[16px]">
                    {lines.map((line, i) => (
                      <div
                        key={i}
                        className="bg-[#E86100] opacity-80 rounded-sm mx-px"
                        style={{
                          width: `2px`,
                          height: `${line.height}px`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="w-8 md:w-12 text-left pl-1 md:pl-2">
                    <span>[{soundOn ? "ON" : "OFF"}]</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    case "menu":
      return (
        <div
          className={`${baseClasses} top-1/2 right-1.5 md:right-3 -translate-y-1/2 w-5 md:w-7 h-48 md:h-72 bg-black`}
          style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 85%)" }}
        >
          <button
            onClick={() => onToggle("menu")}
            className={`${textClasses} flex flex-col items-center justify-center h-full w-full hover:opacity-70`}
            style={textColor}
          >
            {(isMenuOpen ? "CLOSE" : "MENU").split("").map((char, i) => (
              <span
                key={i}
                className="leading-tight tracking-widest transition-opacity duration-300"
              >
                {char}
              </span>
            ))}
          </button>
        </div>
      );
    case "coords":
      return (
        <div
          className={`${baseClasses} top-1/2 left-1.5 md:left-3 -translate-y-1/2 w-5 md:w-7 h-48 md:h-72 bg-black hidden md:flex`}
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
          className={`${baseClasses} bottom-2 md:bottom-3.5 left-1/2 -translate-x-1/2 h-4 md:h-5 lg:h-7 w-32 md:w-40 bg-black rounded-t-xl`}
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
    default:
      return null;
  }
};

const Border = ({
  children,
  nostromoLightClassName,
  nostromoMediumClassName,
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cornerNotchColor = "#000000";

  return (
    <BorderContext.Provider
      value={{ soundOn, setSoundOn, isMenuOpen, setIsMenuOpen, coords }}
    >
      <div
        onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
        className="relative w-full h-full"
      >
        {/* Borders */}
        <div className="fixed top-0 left-0 w-full h-[10px] md:h-[20px] bg-black z-52 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-full h-[10px] md:h-[20px] bg-black z-52 pointer-events-none"></div>
        <div className="fixed top-0 left-0 w-[10px] md:w-[20px] h-full bg-black z-52 pointer-events-none"></div>
        <div className="fixed top-0 right-0 w-[10px] md:w-[20px] h-full bg-black z-52 pointer-events-none"></div>

        {/* Corner Notches - Mobile */}
        <div className="md:hidden">
          <div
            className="fixed top-[10px] left-[10px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderTop: `10px solid ${cornerNotchColor}`,
              borderRight: `10px solid transparent`,
            }}
          />
          <div
            className="fixed top-[10px] right-[10px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderTop: `10px solid ${cornerNotchColor}`,
              borderLeft: `10px solid transparent`,
            }}
          />
          <div
            className="fixed bottom-[10px] left-[10px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderBottom: `10px solid ${cornerNotchColor}`,
              borderRight: `10px solid transparent`,
            }}
          />
          <div
            className="fixed bottom-[10px] right-[10px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderBottom: `10px solid ${cornerNotchColor}`,
              borderLeft: `10px solid transparent`,
            }}
          />
        </div>

        {/* Corner Notches - Desktop */}
        <div className="hidden md:block">
          <div
            className="fixed top-[20px] left-[20px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderTop: `20px solid ${cornerNotchColor}`,
              borderRight: `20px solid transparent`,
            }}
          />
          <div
            className="fixed top-[20px] right-[20px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderTop: `20px solid ${cornerNotchColor}`,
              borderLeft: `20px solid transparent`,
            }}
          />
          <div
            className="fixed bottom-[20px] left-[20px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderBottom: `20px solid ${cornerNotchColor}`,
              borderRight: `20px solid transparent`,
            }}
          />
          <div
            className="fixed bottom-[20px] right-[20px] w-0 h-0 z-52 pointer-events-none"
            style={{
              borderBottom: `20px solid ${cornerNotchColor}`,
              borderLeft: `20px solid transparent`,
            }}
          />
        </div>

        {/* Notches */}
        <div className="pointer-events-auto">
          <Notch type="sound" fontClassName={nostromoLightClassName} />
          <Notch type="menu" fontClassName={nostromoLightClassName} />
          <Notch type="coords" fontClassName={nostromoLightClassName} />
          <Notch type="discover" fontClassName={nostromoLightClassName} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mobile-border-spacing">{children}</div>

        {/* Sliding Menu */}
        <div className="pointer-events-auto">
          <SlidingMenu />
        </div>
      </div>
    </BorderContext.Provider>
  );
};

export default Border;
