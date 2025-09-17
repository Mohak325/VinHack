"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Font setup (keeping exactly as provided)
// Note: In actual Next.js, you'd use: import localFont from 'next/font/local';
// const type12 = localFont({ src: '../fonts/Type12.ttf' });

// For this demo, we'll simulate the font class
const type12 = { className: 'font-mono' }; // Fallback for demo

// Crosshair SVG Component
const CrosshairSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="0" x2="20" y2="40" stroke="#D5D1BE" strokeWidth="1"/>
    <line x1="0" y1="20" x2="40" y2="20" stroke="#D5D1BE" strokeWidth="1"/>
    <circle cx="20" cy="20" r="3" fill="none" stroke="#D5D1BE" strokeWidth="1"/>
  </svg>
);

// Notch Component
const Notch = ({ type, coords, onToggle, fontClassName }) => {
  if (type === "coords") {
    return (
      <div className={`fixed top-4 left-4 z-50 text-xs text-gray-400 ${fontClassName}`}>
        [{coords?.x || 0}, {coords?.y || 0}]
      </div>
    );
  }
  
  if (type === "menu") {
    return (
      <button 
        onClick={onToggle}
        className={`fixed top-4 right-4 z-50 text-xs text-gray-400 hover:text-white transition-colors ${fontClassName}`}
      >
        [MENU]
      </button>
    );
  }
  
  return null;
};

// HACKATHON FLOW DATA
const hackathonEvents = [
  {
    id: 1,
    time: "09:00 AM",
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ CHECK-IN",
    description: "Registration opens. Participants receive their welcome kits, team assignments, and venue orientation. Network with fellow hackers and grab some coffee."
  },
  {
    id: 2,
    time: "11:30 AM", 
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ SPEAKER SESSION",
    description: "Keynote presentations from industry leaders sharing insights on cutting-edge technology trends, innovation strategies, and the future of digital transformation."
  },
  {
    id: 3,
    time: "01:00 PM",
    date: "22 SEP", 
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ LUNCH BREAK",
    description: "Networking lunch with gourmet food options. Connect with mentors, sponsors, and fellow participants while recharging for the challenges ahead."
  },
  {
    id: 4,
    time: "02:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ CTF + TYPING CHALLENGE",
    description: "Mini competitive events featuring Capture The Flag cybersecurity challenges and speed typing competitions. Test your technical skills and reflexes."
  },
  {
    id: 5,
    time: "04:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 1",
    description: "First progress review with mentors. Present your initial concepts, get feedback, and refine your approach based on expert guidance."
  },
  {
    id: 6,
    time: "07:00 PM",
    date: "22 SEP",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ DINNER",
    description: "Evening meal with diverse cuisine options. Relax, socialize, and discuss project ideas with your team and other participants."
  },
  {
    id: 7,
    time: "10:00 PM",
    date: "22 SEP",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ NEGATIVE MINI HACKATHON",
    description: "Unique reverse-engineering challenge. Break down existing solutions, identify flaws, and propose innovative alternatives. Think outside the box!"
  },
  {
    id: 8,
    time: "02:00 AM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 2",
    description: "Late-night progress check. Present your developments, receive crucial feedback, and strategize for the final push toward completion."
  },
  {
    id: 9,
    time: "06:00 AM",
    date: "23 SEP", 
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ BREAK TIME",
    description: "Much-needed rest period. Recharge with breakfast, stretch, and prepare mentally for the final development phase and presentations."
  },
  {
    id: 10,
    time: "08:00 AM",
    date: "23 SEP",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", 
    eventName: "/ REPORT BACK TO VENUE",
    description: "Return to main venue for the final day. Team check-ins, venue setup verification, and preparation for the final countdown phase."
  },
  {
    id: 11,
    time: "10:00 AM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ FINAL COUNTDOWN", 
    description: "Intense final development phase. Polish your projects, prepare presentations, and put the finishing touches on your innovative solutions."
  },
  {
    id: 12,
    time: "12:00 PM",
    date: "23 SEP",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ LUNCH",
    description: "Pre-presentation lunch break. Final meal before the big presentations. Network and calm your nerves before showcasing your hard work."
  },
  {
    id: 13,
    time: "01:30 PM", 
    date: "23 SEP",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ REVIEW SESSION 3",
    description: "Final review session before presentations. Last-minute refinements, presentation rehearsals, and final mentor feedback sessions."
  },
  {
    id: 14,
    time: "05:00 PM",
    date: "23 SEP",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    eventName: "/ FINAL PRESENTATIONS",
    description: "The moment you've been working toward! Present your innovative solutions to judges, sponsors, and fellow participants. Showcase your creativity and technical skills."
  },
  {
    id: 15,
    time: "07:00 PM",
    date: "23 SEP", 
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    eventName: "/ CLOSING CEREMONY",
    description: "Celebration time! Awards presentation, winner announcements, networking opportunities, and commemoration of an incredible hackathon journey."
  }
];

// Card Border SVG Component
const CardBorderSVG = ({ imageUrl, altText = 'Event image', strokeColor = 'white' }) => {
  const mainPathD = "M373.527 7H20.0125C17.2462 7 15.0056 9.24615 15.0125 12.0124L16.2157 495.487C16.2226 498.244 18.4592 500.475 21.2157 500.475H374.755C377.517 500.475 379.755 498.236 379.755 495.475V314.708C379.755 313.447 379.279 312.233 378.422 311.308L366.351 298.286C365.494 297.361 365.018 296.147 365.018 294.887V210.938C365.018 209.568 365.58 208.258 366.573 207.314L376.972 197.43C377.965 196.486 378.527 195.176 378.527 193.806V12C378.527 9.23858 376.289 7 373.527 7Z";

  return (
    <svg width="100%" height="100%" viewBox="0 0 387 508" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id={`imageClipPath-${Math.random()}`}>
          <path d={mainPathD} />
        </clipPath>
        
        <linearGradient id={`smoothGradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="50%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>

        <filter id={`glow-${Math.random()}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        </filter>
      </defs>

      <image
        xlinkHref={imageUrl}
        alt={altText}
        x="0" y="0" width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#imageClipPath-${Math.random()})`}
      />

      <path d={mainPathD} stroke={`url(#smoothGradient-${Math.random()})`} strokeWidth="15" fill="none" filter={`url(#glow-${Math.random()})`} />
      <path d={mainPathD} stroke={`url(#smoothGradient-${Math.random()})`} strokeWidth="14" fill="none"/>
      <path d="M1 399.28L7.75473 395V479.386L1 474.494V399.28Z" fill={strokeColor} stroke={strokeColor}/>
    </svg>
  );
};

// Timeline Grid Background
const TimelineGrid = ({ children }) => {
  return (
    <div className="w-full min-h-screen relative bg-black text-[#D5D1BE] font-mono">
      {/* Mobile grid */}
      <div className="absolute inset-0 opacity-40 md:hidden"
        style={{
          backgroundImage: `linear-gradient(to right, #4A2E00 1px, transparent 1px), linear-gradient(to bottom, #4A2E00 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}/>
      <div className="absolute inset-0 opacity-40 md:hidden"
        style={{
          backgroundImage: `radial-gradient(#8F3C00 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '10px 10px'
        }}/>
      
      {/* Desktop grid */}
      <div className="absolute inset-0 opacity-40 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(to right, #4A2E00 1px, transparent 1px), linear-gradient(to bottom, #4A2E00 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}/>
      <div className="absolute inset-0 opacity-40 hidden md:block"
        style={{
          backgroundImage: `radial-gradient(#8F3C00 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px'
        }}/>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
};

// GSAP-enhanced Timeline Section
const GSAPTimelineSection = ({ events }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // GSAP scroll implementation
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        // Import GSAP dynamically
        const { gsap } = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        const { ScrollTrigger } = await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
          const cards = containerRef.current.querySelectorAll('.timeline-card');
          
          // Set up horizontal scrolling animation
          gsap.to(cards, {
            xPercent: -100 * (cards.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: 1,
              snap: 1 / (cards.length - 1),
              end: () => "+=" + (containerRef.current?.offsetWidth * cards.length),
              onUpdate: (self) => {
                const index = Math.round(self.progress * (cards.length - 1));
                setCurrentIndex(index);
              }
            }
          });
        }
      } catch (error) {
        console.warn('GSAP failed to load, falling back to CSS scrolling');
      }
    };

    loadGSAP();

    // Cleanup
    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [events.length]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div className="flex h-full">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="timeline-card flex-shrink-0 w-full h-full flex items-center justify-center px-4 sm:px-8"
          >
            <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
              {/* Card */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] h-[320px] sm:h-[380px] lg:h-[450px] flex-shrink-0">
                <CardBorderSVG imageUrl={event.image} altText={event.eventName} />
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center xl:text-left max-w-2xl">
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                  [{event.date} {event.time}] {'{'}
                </p>
                <p className="pl-4 sm:pl-6 lg:pl-8 my-3 lg:my-4 text-cyan-400 text-base sm:text-lg lg:text-xl font-medium">
                  {event.eventName}
                </p>
                <p className="mt-4 lg:mt-6 text-gray-300 text-sm sm:text-base lg:text-lg">
                  [DESCRIPTION] {'{'}
                </p>
                <p className="pl-4 sm:pl-6 lg:pl-8 mt-3 lg:mt-4 text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl xl:max-w-none">
                  {event.description}
                </p>
                <p className="text-gray-300 mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg">{'}'}</p>
                <p className="text-gray-300 mt-2 text-sm sm:text-base lg:text-lg">{'}'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      
      {/* Event Counter */}
      <div className="absolute top-8 right-8 text-gray-400 text-sm font-mono">
        [{String(currentIndex + 1).padStart(2, '0')}/{String(events.length).padStart(2, '0')}]
      </div>
    </div>
  );
};

// Main Timeline Component
const Timeline = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Notch type="coords" coords={coords} fontClassName="font-mono" />
      <Notch type="menu" onToggle={() => alert('Menu toggled!')} fontClassName="font-mono" />
      
      <TimelineGrid>
        <header className="sticky top-0 z-20 flex flex-col sm:flex-row justify-between items-start mb-8 lg:mb-16 bg-black/90 backdrop-blur-sm py-6 gap-4">
          <h1 className={`text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-[0.1em] sm:tracking-[0.2em] lg:tracking-[0.3em] text-gray-200 ${type12.className}`}>
            HACKATHON
          </h1>
          <div className="hidden sm:block">
            <CrosshairSVG />
          </div>
        </header>

        {/* Timeline Section with GSAP */}
        <div className="min-h-screen">
          <div className="mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-2 lg:mb-4">
              [48 HOUR JOURNEY]
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400">
              [FROM CONCEPT TO CREATION]
            </p>
          </div>
          
          <GSAPTimelineSection events={hackathonEvents} />
        </div>
      </TimelineGrid>
    </div>
  );
};

export default Timeline;