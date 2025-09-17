"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll } from "framer-motion";

import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";
import FaqSection from "./components/FAQ";
import Footer from "./components/Footer";
import Tracks from "./components/Track";
import Coc from "./components/coc.jsx";
import Rules from "./components/rules.jsx";
import Border from "./components/Border";

import { ruigslay, nostromoLight, nostromoMedium } from "./fonts";
import AboutVinnovateit from "./components/about/AboutVinnovateit";
import AboutVinnhack from "./components/about/AboutVinhack";
import Timeline from "./components/TImeline";
import { GridPlusBackground } from "./components/Grid";

import Marquees from "./components/Marquee";

function MainContent({ fontClassNames, isVisible }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    return scrollYProgress.onChange((latest) => {
      // Flip happens when scrolled past 50%
      setIsFlipping(latest > 0.5);
    });
  }, [scrollYProgress, isMounted]);

  return (
    <Border {...fontClassNames}>
      <Hero {...fontClassNames} isVisible={isVisible} />
      <div className="w-full h-[20vh] md:h-[30vh]" />

      <GridPlusBackground>
        {/* Scroll container for flipping effect */}
        <div ref={containerRef}>
          <div className="w-full h-[15vh] md:h-[25vh]" />
          <AboutVinnhack isFlipping={isFlipping} />
          <div className="w-full h-[15vh] md:h-[25vh]" />
          <AboutVinnovateit isFlipping={isFlipping} />
          <div className="w-full h-[15vh] md:h-[25vh]" />
        </div>
        {/* Tracks section */}
        <Tracks />
        {/* FAQ section */}
        <FaqSection />
      </GridPlusBackground>
      {/* Remaining sections */}
      <>
        {/* <Timeline /> */}
        <Coc />
        <Rules />
        <Footer />
      </>
    </Border>
  );
}

export default function Home() {
  // State to manage the loading screen's visibility and fade-out animation
  const [isLoading, setIsLoading] = useState(true);
  // State to mount the main content after loading
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  // State to control the presence of the loading screen in the DOM
  const [isLoaderPresent, setIsLoaderPresent] = useState(true);

  // This function is called by LoadingScreen when it's done
  const handleLoadingComplete = () => {
    // 1. Mount the Hero and other main components immediately.
    // They will render underneath the still-visible loading screen.
    setIsHeroVisible(true);
    // 2. Wait a moment, then trigger the fade-out of the loading screen.
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    // 3. After the fade-out animation (1000ms) is complete, remove the
    // loading screen from the DOM.
    setTimeout(() => {
      setIsLoaderPresent(false);
    }, 1100); // 100ms delay + 1000ms animation duration
  };

  const assetPaths = [
    "/assets/bottom_left_hand.svg",
    "/assets/top_right_hand.svg",
  ];

  // Pass font class names to components that need them
  const fontClassNames = {
    ruigslayClassName: ruigslay.className,
    nostromoLightClassName: nostromoLight.className,
    nostromoMediumClassName: nostromoMedium.className,
  };

  return (
    <main className="relative bg-[#D5D1BE] text-white">
      {isLoaderPresent && (
        <LoadingScreen
          onCompletion={handleLoadingComplete}
          assetPaths={assetPaths}
          isFadingOut={!isLoading}
        />
      )}

      {isHeroVisible && (
        <MainContent
          fontClassNames={fontClassNames}
          isVisible={isHeroVisible}
        />
      )}
    </main>
  );
}
