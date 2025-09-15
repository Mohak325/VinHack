"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CrosshairSVG from './Crosshair.jsx'; // Assuming Crosshair.jsx is in the same directory
import localFont from 'next/font/local';

// --- FONT SETUP ---
// 1. Load the custom Type12 font using a dummy path.
//    Make sure to place Type12.ttf in the correct folder in your project.
const type12 = localFont({ src: '../fonts/Type12.ttf' });


// --- DATA FOR DAY 01 EVENTS ---
const events_day1 = [
  {
    id: 1,
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ LAUNCH BRIEFING",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    date: "23 SEP",
    image: "https://images.pexels.com/photos/2128028/pexels-photo-2128028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ CYBERNETICS EXPO",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    date: "24 SEP",
    image: "https://images.pexels.com/photos/7319323/pexels-photo-7319323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ AI ETHICS DEBATE",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
    {
    id: 4,
    date: "25 SEP",
    image: "https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ ROBOTICS WORKSHOP",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 5,
    date: "26 SEP",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ VIRTUAL REALITY DEMO",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
  },
  {
    id: 6,
    date: "27 SEP",
    image: "https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ SPACE EXPLORATION TALK",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione."
  },
  {
    id: 7,
    date: "28 SEP",
    image: "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ SATELLITE HACKATHON",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora."
  },
  {
    id: 8,
    date: "29 SEP",
    image: "https://images.pexels.com/photos/112285/pexels-photo-112285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ CLOSING CEREMONY",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum."
  }
];

// --- DATA FOR DAY 02 EVENTS ---
const events_day2 = [
  {
    id: 9,
    date: "30 SEP",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ ADVANCED AI SEMINAR",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 10,
    date: "01 OCT",
    image: "https://images.pexels.com/photos/572688/pexels-photo-572688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ QUANTUM COMPUTING WORKSHOP",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 11,
    date: "02 OCT",
    image: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ BIO-TECH CONFERENCE",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: 12,
    date: "03 OCT",
    image: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ NEURAL NETWORKS SYMPOSIUM",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 13,
    date: "04 OCT",
    image: "https://images.pexels.com/photos/1181275/pexels-photo-1181275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ DATA SCIENCE SUMMIT",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam."
  },
  {
    id: 14,
    date: "05 OCT",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ FINTECH FORUM",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione."
  },
  {
    id: 15,
    date: "06 OCT",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ CRYPTOCURRENCY CRASH COURSE",
    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora."
  },
  {
    id: 16,
    date: "07 OCT",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ AGILE DEVELOPMENT WORKSHOP",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum."
  },
  {
    id: 17,
    date: "08 OCT",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ PROJECT MANAGEMENT MASTERCLASS",
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores."
  }
];


// --- COPIED FROM Notch.jsx ---
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
      let wavePhase = 0;
      const animateOn = () => {
        wavePhase += 0.15;
        const newLines = [...Array(lineCount)].map((_, i) => {
          const height = 4 + 10 * (0.5 + 0.5 * Math.sin(i * 0.5 + wavePhase));
          return { height };
        });
        setLines(newLines);
        animationFrameId.current = requestAnimationFrame(animateOn);
      };
      animateOn();
    } else {
      const animateOff = (timestamp) => {
        if (!transitionStartTime.current) {
          transitionStartTime.current = timestamp;
          startLines.current = lines;
        }

        const elapsed = timestamp - transitionStartTime.current;
        const duration = 200;
        const progress = Math.min(elapsed / duration, 1);

        const newLines = startLines.current.map((startLine, i) => {
          const endHeight = staticLines[i].height;
          const height =
            startLine.height - (startLine.height - endHeight) * progress;
          return { height };
        });

        setLines(newLines);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animateOff);
        } else {
          transitionStartTime.current = null;
        }
      };
      animationFrameId.current = requestAnimationFrame(animateOff);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [soundOn, type, lines, staticLines]);

  useEffect(() => {
    if (type === "sound" && !soundOn) {
      setLines(staticLines);
    }
  }, [soundOn, type, staticLines]);

  const textClasses = `tracking-[0.2em] select-none ${fontClassName || ''}`;
  const textColor = { color: "#ea8244" };

  switch (type) {
    case "coords":
      return (
        <div className="absolute top-0 left-0 p-4" style={{ color: "#ea8244" }}>
          <p className={textClasses}>X {coords?.x || "0000"}</p>
          <p className={textClasses}>Y {coords?.y || "0000"}</p>
        </div>
      );
    case "menu":
       return (
        <div className="absolute top-0 right-0 p-4 text-right">
          <p className={`${textClasses} hover:opacity-70 cursor-pointer`} style={textColor} onClick={onToggle}>
            MENU
          </p>
        </div>
      );
    default:
      return null;
  }
};
// --- END OF COPIED CODE ---

/**
 * CardBorderSVG component
 */
const CardBorderSVG = ({ imageUrl, altText = 'Event image', strokeColor = 'white' }) => {
    const mainPathD = "M373.527 7H20.0125C17.2462 7 15.0056 9.24615 15.0125 12.0124L16.2157 495.487C16.2226 498.244 18.4592 500.475 21.2157 500.475H374.755C377.517 500.475 379.755 498.236 379.755 495.475V314.708C379.755 313.447 379.279 312.233 378.422 311.308L366.351 298.286C365.494 297.361 365.018 296.147 365.018 294.887V210.938C365.018 209.568 365.58 208.258 366.573 207.314L376.972 197.43C377.965 196.486 378.527 195.176 378.527 193.806V12C378.527 9.23858 376.289 7 373.527 7Z";

    return (
        <svg width="100%" height="100%" viewBox="0 0 387 508" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <clipPath id="imageClipPath">
                    <path d={mainPathD} />
                </clipPath>
                
                {/* Define a smooth gradient for the border */}
                <linearGradient id="smoothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBCFE8" /> {/* Light Pink */}
                    <stop offset="50%" stopColor="#C4B5FD" /> {/* Lavender */}
                    <stop offset="100%" stopColor="#93C5FD" /> {/* Light Blue */}
                </linearGradient>

                {/* Define a blur filter for the glow effect */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                </filter>
            </defs>

            {/* The main content image, clipped by the path */}
            <image
                xlinkHref={imageUrl}
                alt={altText}
                x="0" y="0" width="100%" height="100%"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#imageClipPath)"
            />

            {/* Path for the glow effect (thicker, blurred, behind) */}
            <path d={mainPathD} stroke="url(#smoothGradient)" strokeWidth="15" fill="none" filter="url(#glow)" />

            {/* The main border path (sharp, on top) */}
            <path d={mainPathD} stroke="url(#smoothGradient)" strokeWidth="14" fill="none"/>
            
            {/* The small white accent, always on top */}
            <path d="M1 399.28L7.75473 395V479.386L1 474.494V399.28Z" fill={strokeColor} stroke={strokeColor}/>
        </svg>

    );
};

/**
 * TimelineGrid component
 */
const TimelineGrid = ({ children }) => {
  return (
    <div className="w-full min-h-screen relative bg-black text-[#D5D1BE] font-mono p-4 sm:p-8">
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #4A2E00 1px, transparent 1px), linear-gradient(to bottom, #4A2E00 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}/>
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(#8F3C00 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px'
        }}/>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

/**
 * Reusable TimelineSection component
 */
const TimelineSection = ({ day, dayNumber, events }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${100 * (events.length)}%`]);

  return (
    <main className="flex gap-8">
      {/* Sticky Sidebar */}
      <div className="sticky top-1/4 h-screen py-8 pl-16">
        <h2 className="text-4xl text-gray-300 mb-8 whitespace-nowrap">[DAY {day}]</h2>
        <p className="text-2xl text-gray-400">[{dayNumber}]</p>
      </div>

      {/* Horizontal Scrolling Section */}
      <div ref={scrollRef} className="relative h-[300vh] w-full">
        <div className="sticky top-1/4 h-screen">
          <motion.div style={{ x }} className="flex h-full items-center">
            {events.map((event) => (
              <div key={event.id} className="w-screen flex-shrink-0 flex justify-center">
                 <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-4xl">
                      <div className="w-[250px] h-[350px] flex-shrink-0 relative">
                          <CardBorderSVG imageUrl={event.image} altText={event.eventName} />
                      </div>
                      <div className="pt-0 md:pt-4">
                          <p className="text-gray-300">[{event.date} 9:00 AM] {'{'}</p>
                          <p className="pl-8 my-2 text-cyan-400">{event.eventName}</p>
                          <p className="mt-8 text-gray-300">[DESCRIPTION] {'{'}</p>
                          <p className="pl-8 mt-2 text-gray-500">{event.description}</p>
                          <p className="text-gray-300 mt-2">{'}'}</p>
                          <p className="text-gray-300 mt-2">{'}'}</p>
                      </div>
                  </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
};


/**
 * Main Timeline component
 */
const Timeline = () => {
  // 2. The useEffect for loading Google Fonts is no longer needed.
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap";
  //   link.rel = 'stylesheet';
  //   document.head.appendChild(link);
  // }, []);

  return (
    <div className="bg-black">
      <Notch type="coords" coords={{ x: 2048, y: 5824 }} fontClassName="font-mono" />
      <Notch type="menu" onToggle={() => alert('Menu toggled!')} fontClassName="font-mono" />
      
      <TimelineGrid>
        <header className="sticky top-0 z-20 flex justify-between items-start mb-16 flex-wrap bg-black py-4">
          {/* 3. Apply the font via className and remove the inline style */}
          <h1 className={`text-5xl md:text-7xl font-bold tracking-[0.2em] md:tracking-[0.4em] text-gray-200 ${type12.className}`}>
            TIMELINE
          </h1>
          <div className="hidden sm:block">
            <CrosshairSVG />
          </div>
        </header>

        {/* Render the timeline sections */}
        <TimelineSection day="01" dayNumber="001" events={events_day1} />
        <TimelineSection day="02" dayNumber="002" events={events_day2} />
        
      </TimelineGrid>
    </div>
  );
};

export default Timeline;