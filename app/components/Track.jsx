'use client';

import React, { useState, useEffect, useRef } from 'react';
import Notch from './Notch';
// Grid.jsx is no longer imported, as the component is defined locally below.

// 1. Import your custom fonts directly into this file.
//    (Ensure the path '../lib/fonts' is correct for your project structure)
import { orbitron, nostromoLight, nostromoMedium, ruigslay } from '../fonts';
import localFont from 'next/font/local';

const type12 = localFont({ src: '../fonts/Type12.ttf' });

// Local Grid component from our previous fix to ensure it's visible.
const GridPlusBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
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
      <div className="absolute inset-0 grid grid-cols-5 gap-8 p-8">
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
    </div>
  );
};


// --- The image paths are now updated with smaller, optimized stock photos ---
const tracksData = [
  {
    id: '.01',
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam....',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '.02',
    title: 'Vestibulum sed arcu non odio',
    description: 'Euismod lacinia at quis risus. Sed vulputate mi sit amet mauris. Velit sed ullamcorper morbi tincidunt ornare massa eget. Ut enim ad minim veniam....',
    imageUrl: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '.03',
    title: 'Integer enim neque volutpat',
    description: 'Ac tincidunt vitae semper quis. Nunc sed velit dignissim sodales ut eu sem. Amet justo donec enim diam vulputate ut. Ut enim ad minim veniam....',
    imageUrl: 'https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '.04',
    title: 'Pellentesque habitant morbi',
    description: 'Tristique senectus et netus et. Egestas purus viverra accumsan in nisl. At quis risus sed vulputate odio ut enim. Ut enim ad minim veniam....',
    imageUrl: 'https://images.unsplash.com/photo-1552854728-6b8b35520a04?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '.05',
    title: 'Massa ultricies mi quis',
    description: 'Hendrerit dolor magna. Et netus et malesuada fames ac turpis. Amet consectetur adipiscing elit duis tristique. Ut enim ad minim veniam....',
    imageUrl: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=500&auto=format&fit=crop',
  },
];


const Tracks = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const containerRef = useRef(null);
  
  const finalAnimationTarget = (tracksData.length - 1 + 0.15) / tracksData.length;
  const containerHeightVh = 100 + ((tracksData.length - 1) * 100 * finalAnimationTarget);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      const animationProgress = progress * finalAnimationTarget;
      setScrollProgress(animationProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [finalAnimationTarget]);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const progressTotal = scrollProgress * tracksData.length;
  const currentCardFloat = Math.floor(progressTotal);
  const progressWithinCard = progressTotal - currentCardFloat;

  let circleX, circleY;
  const isCurrentSideEven = currentCardFloat % 2 === 0;
  
  const topBound = -35;
  const bottomBound = 35;
  const verticalTravel = bottomBound - topBound;

  if (progressWithinCard < 0.5) {
    const descentProgress = progressWithinCard * 2;
    circleY = topBound + descentProgress * verticalTravel;
    circleX = isCurrentSideEven ? 75 : 25;
  } else {
    const transitionProgress = (progressWithinCard - 0.5) * 2;
    circleY = bottomBound - transitionProgress * verticalTravel;
    const startX = isCurrentSideEven ? 75 : 25;
    const endX = isCurrentSideEven ? 25 : 75;
    circleX = startX + transitionProgress * (endX - startX);
  }

  const circleStyle = { top: '50%', left: `${circleX}%`, transform: `translate(-50%, ${circleY}%)` };
  const progressPerCard = 1 / tracksData.length;
  const titleOpacity = 1 - Math.min(1, scrollProgress / (progressPerCard * 0.5));
  
  const firstCard = tracksData[0];
  const introTransitionEnd = 0.1; 
  const introOpacity = 1 - Math.min(1, progressTotal / introTransitionEnd);

  const currentImageIndex = Math.min(tracksData.length - 1, currentCardFloat);
  const currentImageUrl = tracksData[currentImageIndex]?.imageUrl;
  const circleBgStyle = {
    backgroundImage: `url(${currentImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${containerHeightVh}vh` }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full p-4 sm:p-8 md:p-12">
          {/* Main frame and background */}
          <div className="absolute inset-0 bg-black"></div>
          
          <div className="absolute inset-0 bg-[#E6DCD1]">
              
              <GridPlusBackground />

              <div className="relative w-full h-full z-10">
                  {/* TRACKS title */}
                  <div className="absolute top-0 left-0 w-full pt-16 sm:pt-20 text-center z-20 pointer-events-none transition-opacity duration-300" style={{ opacity: titleOpacity }}>
                      <h2 className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-widest text-black ${type12.className}`}>TRACKS</h2>
                  </div>

                  {/* Animated circle */}
                  <div className="absolute w-48 h-48 md:w-64 md:h-64 z-10" style={circleStyle}>
                      <div 
                        className="w-full h-full rounded-full border-4 border-black transition-all duration-300"
                        style={circleBgStyle}
                      ></div>
                  </div>

                  {/* Initial static text for the first card */}
                  <div
                    className="absolute w-[42%] text-leftt pr-4"
                    style={{
                      top: '50%',
                      left: '75%',
                      transform: 'translate(-160%, -50%)',
                      opacity: introOpacity,
                      pointerEvents: introOpacity > 0 ? 'auto' : 'none',
                    }}
                  >
                    <p className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}>{firstCard.id}</p>
                    <p className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoLight.className}`}>{firstCard.title}</p>
                    <p className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}>
                      {firstCard.description}
                      <a href="#" className="font-bold text-black/70 hover:text-black transition-colors duration-300 ml-1">View More</a>
                    </p>
                  </div>


                  {/* Track content */}
                  <div className="relative w-full h-full z-10">
                      {tracksData.map((track, index) => {
                          const isCardEven = index % 2 === 0;
                          const textAlign = isCardEven ? 'text-left' : 'text-right';
                          const contentAlign = isCardEven ? 'items-start' : 'items-end';
                          const position = isCardEven ? 'left-0' : 'right-0';
                          const padding = isCardEven ? 'pl-16 lg:pl-20' : 'pr-20 lg:pr-24';
                          const firstCardMargin = index === 0 ? 'mt-24 sm:mt-32' : '';
                          
                          const verticalOffset = index === 0 ? 0 : 25;
                          const cardOpacity = index === 0 ? 1 - introOpacity : 1;

                          const combinedStyle = {
                            transform: `translateY(${(index - scrollProgress * tracksData.length) * 100 + verticalOffset}%)`,
                            opacity: cardOpacity,
                          };

                          return (
                              <div 
                                  key={track.id} 
                                  className={`absolute w-[42%] h-full flex flex-col justify-center ${textAlign} ${contentAlign} ${position} ${padding} ${firstCardMargin}`} 
                                  style={combinedStyle}
                              >
                                  <p className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}>{track.id}</p>
                                  <p className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoLight.className}`}>{track.title}</p>
                                  <p className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}>
                                      {track.description}
                                      <a href="#" className="font-bold text-black/70 hover:text-black transition-colors duration-300 ml-1">View More</a>
                                  </p>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Tracks;