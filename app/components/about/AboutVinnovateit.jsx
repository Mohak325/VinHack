"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CoinFlip from "../CoinFlip";
import { orbitron, nostromoLight, nostromoMedium } from "../../fonts";

const AboutVinnovateit = ({ isFlipping }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	});

	// --- ANIMATION MAPPINGS ---
	// Map scroll progress (0 to 1) to CSS values

	// Animations compressed into 20% of scroll (40%-60%) for maximum static time
	// 1. Heading Animation - starts at 40% scroll, completes at 60%
	const headingTop = useTransform(scrollYProgress, [0.4, 0.6], ["85%", "10%"]);
	const headingLeft = useTransform(scrollYProgress, [0.4, 0.6], ["5%", "5%"]);

	// 2. Circle Animation - starts at 40% scroll, completes at 60%
	const circleX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "55%"]);
	const circleScale = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 0.6]);

	// 3. Left & Right Column Fade Out - starts at 38% scroll, fades by 50%
	const sideColumnsOpacity = useTransform(scrollYProgress, [0.38, 0.5], [1, 0]);

	// 4. New Paragraph Fade In - starts at 50% scroll, fully visible at 60%
	const paragraphOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

	return (
		// The main scrollable container - increased height for more static time at end
		<section ref={targetRef} className="relative h-[400vh] min-h-screen">
			{/* The sticky container that holds all content */}
			<div className="sticky top-0 h-screen w-full overflow-hidden max-w-full">
				{/* --- ANIMATED ELEMENTS --- */}

				{/* Left Column (Fades Out) */}
				<motion.div
					style={{ opacity: sideColumnsOpacity }}
					className={`absolute flex flex-col justify-between w-[25%] lg:w-[22%] xl:w-[20%] h-[75%] px-[1.5%] lg:px-[2%] pt-[0.3%] text-xs lg:text-sm xl:text-base overflow-hidden ${orbitron.className}`}
				>
					<div>STYLE = UTF - 1</div>
					<div>ENERGY-PULSE: VIBRANT ORANGE</div>
					<div className="flex flex-row justify-end gap-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<Image
								key={i}
								src="/X.svg"
								alt={`X ${i}`}
								width={16}
								height={16}
								className="lg:w-5 lg:h-5 xl:w-6 xl:h-6"
							/>
						))}
					</div>
					<div>CODE-ESSENCE: CREATIVE CHAOS</div>
					<div>
						<Image
							className="pt-[5%] px-[15%] lg:px-[20%] xl:px-[25%] w-full"
							src="/p1.svg"
							alt="P1 Graphic"
							width={250}
							height={250}
						/>
					</div>
				</motion.div>

				{/* Right Column (Fades Out) */}
				<motion.div
					style={{ opacity: sideColumnsOpacity }}
					className={`absolute right-0 top-0 flex flex-col justify-between p-[2%] lg:p-[2.5%] xl:p-[3%] w-[25%] lg:w-[22%] xl:w-[20%] h-[75%] text-start overflow-hidden ${nostromoLight.className}`}
				>
					<div
						className="text-2xl lg:text-3xl xl:text-4xl"
						style={{ fontWeight: 300 }}
					>
						<div>DISRUPT.</div>
						<div>CREATE.</div>
						<div>DOMINATE.</div>
					</div>
				</motion.div>

				<motion.div
					style={{ opacity: paragraphOpacity }}
					className="absolute top-[25%] bottom-[10%] left-[5%] w-[50%] lg:w-[45%] xl:w-[42%] flex flex-col justify-between overflow-hidden"
				>
					<div
						className="text-[#EA8244] text-justify text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-2 sm:p-3 lg:p-4 xl:p-5 leading-tight sm:leading-relaxed lg:leading-relaxed xl:leading-loose overflow-hidden"
						style={{ fontWeight: 600 }}
					>
						VinnovateIT is the one-stop destination for all you curious cats to
						satisfy your hunger in the diverse world of computer science. In
						other words… think of it as the place where genius meets curiosity —
						and the result is pure magic. So come immerse yourself, in what we
						like to believe is the closest thing to Hogwarts.
					</div>
					<a
						href="https://vinnovateit.com"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-3 lg:mt-4 xl:mt-5 self-start"
					>
						<Image
							src="/click_for_website.svg"
							alt="Learn More About Vinnovateit"
							width={250}
							height={40}
							className="lg:w-[300px] lg:h-[50px] xl:w-[350px] xl:h-[60px]"
						/>
					</a>
				</motion.div>

				{/* Circle (Moves & Scales) */}
				<motion.div
					style={{ x: circleX, scale: circleScale }}
					className="absolute top-[5%] left-[22%] lg:left-[25%] xl:left-[28%] w-[56%] lg:w-[50%] xl:w-[44%] h-[75%] flex justify-center items-center overflow-visible"
				>
					<div className="h-full w-auto aspect-square max-w-full max-h-full relative">
						{/* CoinFlip - exactly like AboutVinhack */}
						<CoinFlip
							frontImg="/vinhack23.jpg"
							backImg="/vinnovateit.jpg"
							isFlipping={isFlipping}
						/>
						{/* Circle Border Frame - 10% larger than the circle */}
						<div className="absolute -inset-[5%] w-[110%] h-[110%] pointer-events-none z-20">
							<Image
								src="/circle_border.svg"
								alt="Circle Border"
								fill
								className="object-contain"
							/>
						</div>
					</div>
				</motion.div>

				{/* Heading (Moves & Scales) */}
				<motion.div
					style={{ top: headingTop, left: headingLeft }} // Control both top and left
					// Remove positioning from className, as it's now fully controlled by style
					className="absolute w-2/3 lg:w-3/5 xl:w-1/2 overflow-hidden"
				>
					<Image
						src="/vinnovateit_text.svg"
						alt="Vinnovateit Text"
						width={400}
						height={100}
						className="w-full h-auto object-contain max-w-full max-h-full"
					/>
				</motion.div>

				{/* --- STATIC ELEMENTS --- */}
				{/* This is the FIRST .02, which fades out */}
				<motion.div
					style={{ opacity: sideColumnsOpacity }} // Re-apply the fade-out opacity
					className={`absolute right-0 top-[37.5%] p-[2.5%] w-[25%] h-[37.5%] text-center ${nostromoMedium.className}`}
				>
					<div
						className="text-4xl lg:text-5xl xl:text-6xl"
						style={{ fontWeight: 700 }}
					>
						.02
					</div>
				</motion.div>

				{/* Container for the cards and the NEW .02 */}
				<div className="absolute bottom-0 right-0 flex w-1/3 h-[25%] items-center justify-center gap-4 lg:gap-6 xl:gap-10 p-0 overflow-hidden">
					{/* This is the NEW .02, which fades in with the paragraph */}
					<motion.div
						style={{ opacity: paragraphOpacity }}
						className={`text-center ${nostromoMedium.className}`}
					>
						<div
							className="text-4xl lg:text-5xl xl:text-6xl"
							style={{ fontWeight: 700 }}
						>
							.02
						</div>
					</motion.div>

					<div className="flex items-center justify-center w-1/4 h-2/3 p-0 overflow-hidden">
						<Image
							src="/card.svg"
							alt="Card Graphic 1"
							width={100}
							height={150}
							className="w-full h-full object-contain max-w-full max-h-full"
						/>
					</div>
					<div className="flex items-center justify-center w-1/4 h-2/3 p-0 overflow-hidden">
						<Image
							src="/card.svg"
							alt="Card Graphic 2"
							width={100}
							height={150}
							className="w-full h-full object-contain max-w-full max-h-full"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutVinnovateit;
