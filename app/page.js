
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useScroll } from "framer-motion";

import LoadingScreen from "./components/loader/Loading";
import Hero from "./components/hero/Hero";
import FaqSection from "./components/FAQ";
import Footer from "./components/Footer";
import Tracks from "./components/Track";
import Coc from "./components/coc.jsx";
import Rules from "./components/rules.jsx";
import Border from "./components/Border";

import { ruigslay, nostromoLight, nostromoMedium } from "./fonts";
import AboutVinnovateit from "./components/about/AboutVinnovateit";
import AboutVinnhack from "./components/about/AboutVinhack";
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
      <Marquees />
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
      {/* Remaining sections */}
      <>
        {/* <Timeline /> */}
        <Coc />
        <Rules />
        <Footer />
      </>
      </GridPlusBackground>
    </Border>
  );
}


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isLoaderPresent, setIsLoaderPresent] = useState(true);

  // This function is called by LoadingScreen when it's done
  const handleLoadingComplete = () => {
    setIsHeroVisible(true);
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
    "/assets/hero/bottom_left_hand.svg",
    "/assets/hero/top_right_hand.svg",
    //TODO: add all assets
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
