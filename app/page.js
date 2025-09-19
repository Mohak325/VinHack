"use client";

import { useState, useRef, useEffect } from "react";
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
import Timeline from "./components/Timeline";
import Marquee from "./components/Marquee";

function MainContent({ fontClassNames, isVisible }) {
	const [isFlipping, setIsFlipping] = useState(false);
	const [isTimelineVisible, setIsTimelineVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const containerRef = useRef(null);
	const timelineRef = useRef(null);

	// Track scroll progress for flipping effect
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
			setIsFlipping(latest > 0.5);
		});
	}, [scrollYProgress, isMounted]);

	// IntersectionObserver for timeline visibility (Border color change)
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsTimelineVisible(entry.isIntersecting);
			},
			{ rootMargin: "-40% 0px -40% 0px", threshold: 0 }
		);

		const currentRef = timelineRef.current;
		if (currentRef) observer.observe(currentRef);

		return () => {
			if (currentRef) observer.unobserve(currentRef);
		};
	}, []);

	return (
		<Border {...fontClassNames} isTimelineVisible={isTimelineVisible}>
			<Hero {...fontClassNames} isVisible={isVisible} />
			<Marquee />

			<GridPlusBackground>
				{/* Scroll container for flipping effect */}
				<div ref={containerRef} className="overflow-x-hidden">
					<div className="h-[15vh] md:h-[25vh]" />
					<AboutVinnhack isFlipping={isFlipping} />
					<div className="h-[15vh] md:h-[25vh]" />
					<AboutVinnovateit isFlipping={isFlipping} />
					<div className="h-[15vh] md:h-[25vh]" />
				</div>

				<Tracks />

				<div ref={timelineRef}>
					<Timeline />
				</div>

				<FaqSection />

				<>
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

	// Called when LoadingScreen finishes
	const handleLoadingComplete = () => {
		setIsHeroVisible(true);
		setTimeout(() => setIsLoading(false), 100);
		setTimeout(() => setIsLoaderPresent(false), 1100);
	};

	const assetPaths = [
		"/assets/hero/bottom_left_hand.svg",
		"/assets/hero/top_right_hand.svg",
		"/assets/hero/sponsor.png",
		"/assets/card.svg",
		"/assets/circle_border.svg",
		"/assets/click_for_website.svg",
		"/assets/logo.png",
		"/assets/p1.svg",
		"/assets/vinhack_pic.jpeg",
		"/assets/vinhack23.jpg",
		"/assets/vinnovateit.jpg",
		"/assets/whiteLogoViit.svg",
		"/assets/X.svg",
		"/assets/loader/loading-top.png",
		"/assets/loader/loading-topmost.png",
		"/assets/loader/loading-bottom.png",
		"/assets/loader/loading-bottommost.png",
		"/assets/tracks/track1.png",
		"/assets/tracks/track2.png",
		"/assets/tracks/track3.png",
		"/assets/tracks/track4.png",
		"/assets/tracks/track5.png",
		"/assets/tracks/track6.png",
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
