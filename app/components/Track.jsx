"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { t012, nostromoLight, nostromoMedium } from "../fonts";

const tracksData = [
  {
    id: '.01',
    title: 'Innovate for Impact',
    description: 'Step into the world where ideas ignite revolutions! Innovate for Impact challenges you to think like entrepreneurs…dream big, solve pressing problems, and create solutions that spark meaningful change. From engineering solutions for education, healthcare, or social justice to sustainable business models, this track empowers you to craft ventures that don\'t just survive but thrive, leaving a legacy of impact.',
    imageUrl: '/assets/tracks/track1.png',
  },
  {
    id: '.02',
    title: 'GraviTech',
    description: 'Most ideas stay on Earth. Yours won\'t. GraviTech challenges you to design technologies that reach into the cosmos, systems that could one day power satellites, space habitats, or interplanetary travel. Navigate the unknown, interpret celestial data, or build autonomous explorers. This is not about looking up at the stars, it\'s about building the tools to live among them.',
    imageUrl: '/assets/tracks/track2.png',
  },
  {
    id: '.03',
    title: 'TaskMaster',
    description: 'Behind every great innovation lies the power of productivity. TaskMaster is your chance to forge tools that don\'t just make work faster, they redefine how it\'s done. Build adaptive assistants, predictive task engines, or collaboration frameworks that feel seamless and intuitive. Your mission: craft technologies that empower creators, builders, and dreamers to achieve more than ever imagined.',
    imageUrl: '/assets/tracks/track3.png',
  },
  {
    id: '.04',
    title: 'InfiniLoop',
    description: 'Innovation means nothing if it can\'t scale. InfiniLoop challenges you to engineer systems that stand the test of time, growth, and demand. From cloud-native solutions to high-performance architectures, your mission is to design technologies that grow seamlessly, no matter how big the challenge. Build for the infinite loop of tomorrow.',
    imageUrl: '/assets/tracks/track4.png',
  },
  {
    id: '.05',
    title: 'CyberForge',
    description: 'This is where imagination takes physical form. CyberForge challenges you to bring robotics into realms once thought impossible. From self-thinking drones to human-assistive machines, craft systems that blur the line between automation and intelligence. Infuse advanced perception, adaptive control, and decision-making into your creations, and forge machines that could change how we live, work, and explore.',
    imageUrl: '/assets/tracks/track5.png',
  },
  {
    id: '.06',
    title: 'Finovate',
    description: 'Finance has been reinvented many times, from coins to credit cards. Now it\'s your turn. Finovate calls on you to reimagine how money flows in the age of AI and blockchain. Create decentralized systems or investment engines that outthink humans. Build the tools that will define the next era of financial innovation.',
    imageUrl: '/assets/tracks/track6.png',
  }
];

const Tracks = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundOn, setSoundOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const finalAnimationTarget =
    (tracksData.length - 1 + 0.15) / tracksData.length;
  const containerHeightVh =
    100 + (tracksData.length - 1) * 100 * finalAnimationTarget;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      const animationProgress = progress * finalAnimationTarget;
      setScrollProgress(animationProgress);
    };

    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [finalAnimationTarget, isMobile]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMobile]);

  // Mobile View
  if (isMobile) {
    return (
      <div className="w-full py-16"
      style={{ backgroundColor: 'rgb(213,209,190)' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-5xl font-black tracking-widest text-black ${t012.className}`}
          >
            TRACKS
          </h2>
        </motion.div>

        <div className="px-4 space-y-12">
          {tracksData.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <p className={`font-bold text-black text-3xl mb-2 ${nostromoMedium.className}`}>
                  {track.id}
                </p>
                <p className={`text-black/80 text-xl mb-4 ${nostromoLight.className}`}>
                  {track.title}
                </p>
                <p className={`leading-relaxed text-black/70 text-base ${nostromoLight.className}`}>
                  {track.description}
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop View (original animation)
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

  const circleStyle = {
    top: "50%",
    left: `${circleX}%`,
    transform: `translate(-50%, ${circleY}%)`,
  };
  const progressPerCard = 1 / tracksData.length;
  const titleOpacity =
    1 - Math.min(1, scrollProgress / (progressPerCard * 0.5));

  const firstCard = tracksData[0];
  const introTransitionEnd = 0.1;
  const introOpacity = 1 - Math.min(1, progressTotal / introTransitionEnd);

  const currentImageIndex = Math.min(tracksData.length - 1, currentCardFloat);
  const currentImageUrl = tracksData[currentImageIndex]?.imageUrl;
  const circleBgStyle = {
    backgroundImage: `url(${currentImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${containerHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full p-4 sm:p-8 md:p-12">
          <div className="relative w-full h-full z-10">
            {/* TRACKS title */}
            <div
              className="absolute top-0 left-0 w-full pt-16 sm:pt-20 text-center z-20 pointer-events-none transition-opacity duration-300"
              style={{ opacity: titleOpacity }}
            >
              <h2
                className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-widest text-black ${t012.className}`}
              >
                TRACKS
              </h2>
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
              className="absolute w-[42%] text-left pr-4"
              style={{
                top: '50%',
                left: '75%',
                transform: 'translate(-160%, -50%)',
                opacity: introOpacity,
                pointerEvents: introOpacity > 0 ? 'auto' : 'none',
              }}
            >
              <p
                className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}
              >
                {firstCard.id}
              </p>
              <p
                className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoLight.className}`}
              >
                {firstCard.title}
              </p>
              <p
                className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}
              >
                {firstCard.description}
                <a
                  href="#"
                  className="font-bold text-black/70 hover:text-black transition-colors duration-300 ml-1"
                >
                  View More
                </a>
              </p>
            </div>

            {/* Track content */}
            <div className="relative w-full h-full z-10">
                {tracksData.map((track, index) => {
                  const isCardEven = index % 2 === 0;
                  const textAlign = isCardEven ? "text-left" : "text-right";
                  const contentAlign = isCardEven ? "items-start" : "items-end";
                  const position = isCardEven ? "left-0" : "right-0";
                  const padding = isCardEven
                    ? "pl-16 lg:pl-20"
                    : "pr-20 lg:pr-24";
                  const firstCardMargin = index === 0 ? "mt-24 sm:mt-32" : "";

                  const verticalOffset = index === 0 ? 0 : 25;
                  const cardOpacity = index === 0 ? 1 - introOpacity : 1;

                  const combinedStyle = {
                    transform: `translateY(${
                      (index - scrollProgress * tracksData.length) * 100 +
                      verticalOffset
                    }%)`,
                    opacity: cardOpacity,
                  };

                  return (
                    <div
                      key={track.id}
                      className={`absolute w-[42%] h-full flex flex-col justify-center ${textAlign} ${contentAlign} ${position} ${padding} ${firstCardMargin}`}
                      style={combinedStyle}
                    >
                      <p
                        className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}
                      >
                        {track.id}
                      </p>
                      <p
                        className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoLight.className}`}
                      >
                        {track.title}
                      </p>
                      <p
                        className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}
                      >
                        {track.description}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;