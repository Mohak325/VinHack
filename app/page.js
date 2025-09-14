"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll } from "framer-motion";

import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";
import FaqSection from "./components/FAQ";
import Footer from "./components/Footer";
import Tracks from "./components/Track";
import { ruigslay, nostromoLight, nostromoMedium } from "./fonts";
import AboutVinnovateit from "./components/about/AboutVinnovateit";
import AboutVinnhack from "./components/about/AboutVinhack";
import GridPlusBackground from "./components/Grid";

export default function Home() {
	const [loadingFinished, setLoadingFinished] = useState(false);
	const [isFlipping, setIsFlipping] = useState(false);

	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	useEffect(() => {
		return scrollYProgress.onChange((latest) => {
			// Adjusted for new container height (950vh total)
			// VinHack section: 0% - ~52% (50vh + 400vh + 50vh spacer = 500vh out of 950vh)
			// VinnovateIT section: ~52% - 100%
			if (latest < 0.45) {
				setIsFlipping(false); // Show VinHack content
			} else if (latest > 0.55) {
				setIsFlipping(true); // Show VinnovateIT content
			}
			// Between 0.45-0.55, maintain current state (smooth transition zone)
		});
	}, [scrollYProgress]);

	const assetPaths = [
		"/assets/bottom_left_hand.svg",
		"/assets/top_right_hand.svg",
	];

	return (
		<div>
			{/* Loading screen */}
			<LoadingScreen
				onCompletion={() => setLoadingFinished(true)}
				assetPaths={assetPaths}
			/>

			{/* Hero section */}
			<Hero
				isVisible={loadingFinished}
				ruigslayClassName={ruigslay.className}
				nostromoLightClassName={nostromoLight.className}
				nostromoMediumClassName={nostromoMedium.className}
			/>
			<div className="w-full h-screen" />

			<GridPlusBackground>
				{/* Scroll container for flipping effect */}
				<div ref={containerRef}>
					<div className="w-full h-[50vh]" />
					<AboutVinnhack isFlipping={isFlipping} />
					<div className="w-full h-[50vh]" />
					<AboutVinnovateit isFlipping={isFlipping} />
					<div className="w-full h-[50vh]" />
				</div>

				{/* Remaining sections */}
				<Tracks />
				<FaqSection />
				<Footer />
			</GridPlusBackground>
		</div>
	);
}
