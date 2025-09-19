"use client";

import { useState, useRef, useEffect } from "react";

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
import Timeline from "./components/Timeline";

function MainContent({ fontClassNames, isVisible }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTimelineVisible(entry.isIntersecting);
      },
      {
        // This creates a horizontal band across the middle of the screen
        // The color will change when the timeline enters this band
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    const currentRef = timelineRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
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
		<>
			<Hero {...fontClassNames} isVisible={isVisible} />
			<Marquees />
			<GridPlusBackground>
				{/* Scroll container for flipping effect */}
				<div ref={containerRef} className="overflow-x-hidden">
					<div className="h-[15vh] md:h-[25vh]" />
					<AboutVinnhack isFlipping={isFlipping} />
					<div className="h-[15vh] md:h-[25vh]" />
					<AboutVinnovateit isFlipping={isFlipping} />
					<div className="h-[15vh] md:h-[25vh]" />
				</div>

				{/* Tracks section */}
				<Tracks />
				{/* FAQ section */}
				<FaqSection />
				{/* Remaining sections */}
				<>
					<Timeline />
					<Coc />
					<Rules />
					<Footer />
				</>
			</GridPlusBackground>
			</>
		</Border>
	);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isLoaderPresent, setIsLoaderPresent] = useState(true);

  const handleLoadingComplete = () => {
    setIsHeroVisible(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    setTimeout(() => {
      setIsLoaderPresent(false);
    }, 1100);
  };

	const assetPaths = [
		"/assets/hero/bottom_left_hand.svg",
		"/assets/hero/top_right_hand.svg",
	];

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

