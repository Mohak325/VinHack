"use client";
import React, { useState, useEffect, useRef } from "react";
import CircularMenu from './CircularMenu.jsx';
import localFont from 'next/font/local'; 

const nostromoLight = localFont({
  src: '../fonts/Nostromo Regular/NostromoRegular-Light.otf', 
});

// This is the sub-component for each notch
const NotchElement = ({ position, soundOn, onToggleSound, onToggleMenu, tokens }) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top": return "top-4 left-1/2 -translate-x-1/2 h-8 md:h-10 w-40 md:w-64";
      case "right": return "top-1/2 right-3 -translate-y-1/2 w-7 h-72";
      case "left": return "top-1/2 left-3 -translate-y-1/2 w-7 h-72";
      case "bottom": return "bottom-3.5 left-1/2 -translate-x-1/2 h-5 md:h-7 w-40";
      default: return "";
    }
  };

  const getClipPath = () => {
    switch (position) {
      case "top": return "polygon(0 0, 100% 0, 85% 100%, 15% 100%)";
      case "right": return "polygon(0 15%, 100% 0, 100% 100%, 0 85%)";
      case "left": return "polygon(0 0, 100% 15%, 100% 85%, 0 100%)";
      case "bottom": return "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)";
      default: return "";
    }
  };

  const baseClasses = "absolute bg-black flex justify-center items-center z-20";
  const positionClasses = getPositionClasses();
  const clipPathStyle = { clipPath: getClipPath() };
  const textClasses = `text-xs md:text-sm tracking-widest transition-opacity ${nostromoLight.className}`;
  const textColor = { color: "#F5B37F" };

  // This is where we render the content for each notch
  const renderContent = () => {
    
    // --- UPDATED SoundWaves component with the superior animation logic ---
    const SoundWaves = ({ soundOn }) => {
      const [lines, setLines] = useState([]);
      const animationFrameId = useRef(null);
      const transitionStartTime = useRef(null);
      const startLines = useRef([]);
      const lineCount = 19;

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
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }

        if (soundOn) {
          // Animation for the "ON" state
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
              const dynamicHeight = (maxHeight - minHeight) * ((combinedWave + 1) / 2);
              const height = minHeight + dynamicHeight * bulgeFactor;
              return { height };
            });
            setLines(newLines);
            animationFrameId.current = requestAnimationFrame(animateOn);
          };
          animateOn();
        } else {
          // Transition to the "OFF" state
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
      }, [soundOn, staticLines, lines.length]); // Added lines.length to dependencies

      return (
        <div className="flex justify-center items-center w-20 h-[16px]">
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
      );
    };

    switch (position) {
      case "top":
        return (
          <div className="relative bottom-1 w-[95%] h-[80%] flex justify-center items-center"
               style={{ backgroundColor: "#8F3C00", clipPath: "polygon(5% 0, 95% 0, 85% 100%, 15% 100%)" }}>
            <button onClick={onToggleSound} className={`flex items-center justify-center w-full h-full hover:opacity-80 ${textClasses}`}
                    style={textColor} type="button">
              <div className="flex items-center">
                <SoundWaves soundOn={soundOn} />
                <div className="w-12 text-left pl-2"><span>[{soundOn ? "ON" : "OFF"}]</span></div>
              </div>
            </button>
          </div>
        );
      case "right":
        return (
            <button onClick={onToggleMenu} className={`flex flex-col items-center justify-center h-full w-full hover:opacity-70 ${textClasses}`} style={textColor}>
              {"MENU".split("").map((char, i) => (
                <span key={i} className="leading-tight tracking-widest">{char}</span>
              ))}
            </button>
        );
      case "left":
        return (
            <div className={`flex flex-col left-0.5 gap-y-0.5 items-start ${textClasses}`} style={textColor}>
                {tokens?.map((t, i) => <span key={i} className="leading-tight">{t}</span>)}
            </div>
        );
      case "bottom":
        return <a href="/" className={`font-bold hover:opacity-70 ${textClasses}`} style={textColor}>BACK</a>;
      default: return null;
    }
  };

  return <div className={`${baseClasses} ${positionClasses}`} style={clipPathStyle}>{renderContent()}</div>;
};

// This is the main component you will import
const NotchedPageWrapper = ({ children }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setCoords({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleToggleSound = () => setSoundOn(!soundOn);
  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const tokenizeCoords = (x, y) => {
    const formatNum = (num) => num.toString().padStart(4, "0").split("");
    return ["X.", ...formatNum(x), "//", "Y.", ...formatNum(y)];
  };

  const menuItems = [
    { name: "ABOUT", href: "#about" },
    { name: "SCHEDULE", href: "#schedule" },
    { name: "PRIZES", href: "#prizes" },
    { name: "SPONSORS", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <section className="relative min-h-screen bg-black p-4">
      {/* Black notched border */}
      <div className="absolute inset-0" style={{ clipPath: "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))" }}></div>
      <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute bottom-0 left-0 w-[30px] h-[30px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black"></div>

      {/* Interactive Notches */}
      <NotchElement position="top" soundOn={soundOn} onToggleSound={handleToggleSound} />
      <NotchElement position="left" tokens={tokenizeCoords(coords.x, coords.y)} />
      <NotchElement position="right" onToggleMenu={handleToggleMenu} />
      <NotchElement position="bottom" />
      
      <div className="relative w-full h-full">
        {children}
      </div>

      {/* Calling CircularMenu with all the required props */}
      <CircularMenu 
        isOpen={menuOpen} 
        onClose={handleToggleMenu} 
        fontClassName={nostromoLight.className}
        items={menuItems}
      />
    </section>
  );
};

export default NotchedPageWrapper;
