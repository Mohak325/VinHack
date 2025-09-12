"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import AboutVinnovateit from "./components/about/AboutVinnovateit";
import AboutVinnhack from "./components/about/AboutVinhack";

export default function Home() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const [isFlipping, setIsFlipping] = useState(false);

	useEffect(() => {
		return scrollYProgress.onChange((latest) => {
			// Flip happens when the container is scrolled 50% of the way through
			setIsFlipping(latest > 0.5);
		});
	}, [scrollYProgress]);

	return (
		<div ref={containerRef}>
			<AboutVinnhack isFlipping={isFlipping} />
			<AboutVinnovateit isFlipping={isFlipping} />
		</div>
	);
}