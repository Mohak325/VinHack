"use client";

import Image from "next/image";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CoinFlip from "../CoinFlip";

const orbitron = Orbitron({ subsets: ["latin"] });

const nostromo = localFont({
	src: [
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Light.otf",
			weight: "300",
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Medium.otf",
			weight: "500",
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Bold.otf",
			weight: "700",
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Heavy.otf",
			weight: "800",
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Black.otf",
			weight: "900",
		},
	],
	display: "swap",
});

const AboutVinhack = ({ isFlipping }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	});

	// --- ANIMATION MAPPINGS ---
	// Map scroll progress (0 to 1) to CSS values

	// Animations compressed into 20% of scroll (40%-60%) for maximum static time
	// 1. Heading Animation - starts at 40% scroll, completes at 60%
	const headingTop = useTransform(
		scrollYProgress,
		[0.4, 0.6],
		["85%", "10%"]
	);
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
		<section ref={targetRef} className="relative h-[400vh]">
			{/* The sticky container that holds all content */}
			<div className="sticky top-0 h-screen w-screen overflow-hidden">
				{/* Background handled by GridPlusBackground wrapper */}

				{/* --- ANIMATED ELEMENTS --- */}

				{/* Left Column (Fades Out) */}
				<motion.div
					style={{ opacity: sideColumnsOpacity }}
					className={`absolute flex flex-col justify-between w-[25%] h-[75%] px-[2%] pt-[0.3%] ${orbitron.className}`}
				>
					<div>STYLE = UTF - 1</div>
					<div>ENERGY-PULSE: VIBRANT ORANGE</div>
					<div className="flex flex-row justify-end gap-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<Image
								key={i}
								src="/X.svg"
								alt={`X ${i}`}
								width={20}
								height={20}
							/>
						))}
					</div>
					<div>CODE-ESSENCE: CREATIVE CHAOS</div>
					<div>
						<Image
							className="pt-[5%] px-[20%] w-full"
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
					className={`absolute right-0 top-0 flex flex-col justify-between p-[2.5%] w-[25%] h-[75%] text-start ${nostromo.className}`}
				>
					<div className="text-[2em]" style={{ fontWeight: 300 }}>
						<div>DISRUPT.</div>
						<div>CREATE.</div>
						<div>DOMINATE.</div>
					</div>
				</motion.div>

				{/* New Paragraph (Fades In) */}
				<motion.div
					style={{ opacity: paragraphOpacity }}
					className="absolute top-[25%] bottom-[10%] left-[5%] w-[50%] flex flex-col justify-between"
				>
					<div
						className="text-[#EA8244] text-justify text-2xl p-4"
						style={{ fontWeight: 600 }}
					>
						VinHack is a 36 hour hybrid hackathon that encourages collaboration,
						learning and innovation through brainstorming groundbreaking ideas
						and generating prototypes that solve real world problems. Conducted
						in 3 rounds, teams of 1-4 members will be provided with an ideal
						platform to analyse the problem statements and develop algorithms to
						implement their solutions. VinHack also incorporates guest speaker
						sessions and fun games to push our coders to achieve their greatest
						potentials and expand their technical knowledge and skills.The event
						will culminate with prizes for winners in various categories.
					</div>
				</motion.div>

				{/* Circle (Moves & Scales) */}
				<motion.div
					style={{ x: circleX, scale: circleScale }}
					className="absolute top-[5%] left-[25%] w-[50%] h-[75%] flex justify-center items-center"
				>
					<div className="h-full w-auto aspect-square">
						<CoinFlip
							frontImg="/vinhack23.jpg"
							backImg="/vinnovateit.png"
							isFlipping={isFlipping}
						/>
					</div>
				</motion.div>

				{/* Heading (Moves & Scales) */}
				<motion.div
					style={{ top: headingTop, left: headingLeft }} // Control both top and left
					// Remove positioning from className, as it's now fully controlled by style
					className="absolute w-2/3"
				>
					<Image
						src="/vinnhack_text.svg"
						alt="Vinnhack Text"
						width={400}
						height={100}
						className="w-full h-auto object-contain"
					/>
				</motion.div>

				{/* --- STATIC ELEMENTS --- */}
				{/* This is the FIRST .02, which fades out */}
				<motion.div
					style={{ opacity: sideColumnsOpacity }} // Re-apply the fade-out opacity
					className={`absolute right-0 top-[37.5%] p-[2.5%] w-[25%] h-[37.5%] text-center ${nostromo.className}`}
				>
					<div className="text-5xl" style={{ fontWeight: 700 }}>
						.01
					</div>
				</motion.div>

				{/* Container for the cards and the NEW .02 */}
				<div className="absolute bottom-0 right-0 flex w-1/3 h-[25%] items-center justify-center gap-10 p-0">
					{/* This is the NEW .02, which fades in with the paragraph */}
					<motion.div
						style={{ opacity: paragraphOpacity }}
						className={`text-center ${nostromo.className}`}
					>
						<div className="text-5xl" style={{ fontWeight: 700 }}>
							.01
						</div>
					</motion.div>

					<div className="flex items-center justify-center w-1/4 h-2/3 p-0">
						<Image
							src="/card.svg"
							alt="Card Graphic 1"
							width={100}
							height={150}
							className="flex w-full h-full object-contain"
						/>
					</div>
					<div className="flex items-center justify-center w-1/4 h-2/3 p-0">
						<Image
							src="/card.svg"
							alt="Card Graphic 2"
							width={100}
							height={150}
							className="w-full h-full object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutVinhack;
