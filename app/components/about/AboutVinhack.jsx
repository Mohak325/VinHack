"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoinFlip from "../CoinFlip";
import { orbitron, nostromoLight, nostromoMedium, t012 } from "../../fonts";

gsap.registerPlugin(ScrollTrigger);

const AboutVinhack = ({ isFlipping }) => {
	const targetRef = useRef(null);
	const headingRef = useRef(null);
	const circleRef = useRef(null);
	const sideColumnsLeftRef = useRef(null);
	const sideColumnsRightRef = useRef(null);
	const paragraphRef = useRef(null);
	const staticDotRef = useRef(null);
	const newDotRef = useRef(null);

	useEffect(() => {
		// guard
		if (!targetRef.current) return;

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			// DESKTOP timeline (>= 768px)
			mm.add("(min-width: 768px)", () => {
				const scrollLen = window.innerHeight * 3.2;
				const stickyEl = targetRef.current.querySelector(".sticky-container");

				const tl = gsap.timeline({
					defaults: { ease: "power1.out" },
					scrollTrigger: {
						trigger: targetRef.current,
						start: "top top",
						end: `+=${scrollLen}`,
						scrub: true,
						pin: stickyEl,
						pinSpacing: true,
					},
				});

				gsap.set([paragraphRef.current, newDotRef.current], { opacity: 0 });
				gsap.set(
					[
						sideColumnsLeftRef.current,
						sideColumnsRightRef.current,
						staticDotRef.current,
					],
					{ opacity: 1 }
				);

				tl.to(
					headingRef.current,
					{
						y: "-75vh", // moved higher for better positioning
						duration: 1,
					},
					0
				)
					.to(
						circleRef.current,
						{
							// diagonal rightward (positive x), slight upward for depth
							x: "35%",
							y: "-15%",
							scale: 0.75,
							duration: 1,
						},
						0
					)
					.to(
						[
							sideColumnsLeftRef.current,
							sideColumnsRightRef.current,
							staticDotRef.current,
						],
						{ opacity: 0, duration: 0.8 },
						0.25
					)
					.to(
						[paragraphRef.current, newDotRef.current],
						{ opacity: 1, duration: 0.9 },
						0.6
					);

				return () => {
					tl.kill();
				};
			});

			// MOBILE timeline (< 768px) - much gentler movement and no clipping
			mm.add("(max-width: 767px)", () => {
				const scrollLen = window.innerHeight * 1.5; // shorter on mobile
				const stickyEl = targetRef.current.querySelector(".sticky-container");

				const tl = gsap.timeline({
					defaults: { ease: "none" },
					scrollTrigger: {
						trigger: targetRef.current,
						start: "top top",
						end: `+=${scrollLen}`,
						scrub: true,
						pin: stickyEl,
						pinSpacing: true,
					},
				});

				gsap.set([paragraphRef.current, newDotRef.current], { opacity: 0 });
				gsap.set(
					[
						sideColumnsLeftRef.current,
						sideColumnsRightRef.current,
						staticDotRef.current,
					],
					{ opacity: 0 }
				); // hidden on mobile anyway

				tl.to(headingRef.current, { y: "-28vh", duration: 1 }, 0) // smaller upward movement
					.to(
						circleRef.current,
						{
							// keep coin mostly centered on mobile — only slight upward motion and small scale
							x: "0%",
							y: "-10%",
							scale: 0.88,
							duration: 1,
						},
						0
					)
					.to(
						[paragraphRef.current, newDotRef.current],
						{ opacity: 1, duration: 0.7 },
						0.3
					);

				return () => {
					tl.kill();
				};
			});

			// Refresh on resize to keep ScrollTrigger calculations accurate
			const handleResize = () => {
				ScrollTrigger.refresh();
			};
			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
				mm.revert(); // revert matchMedia registrations and ScrollTriggers created by it
			};
		}, targetRef);

		return () => ctx.revert();
	}, [isFlipping]);

	return (
		// The main scrollable container
		<section
			ref={targetRef}
			className="relative h-[250vh] md:h-[300vh] lg:h-[400vh]"
		>
			{/* The sticky container that holds all content */}
			{/* NOTE: changed overflow-hidden -> overflow-visible so animations don't get clipped */}
			<div className="sticky-container sticky top-0 h-screen w-full overflow-visible">
				{/* --- ANIMATED ELEMENTS --- */}

				{/* Left Column (Fades Out) */}
				<div
					ref={sideColumnsLeftRef}
					className={`absolute flex flex-col justify-between 
            w-[40%] sm:w-[30%] md:w-[22%] 
            h-[60%] sm:h-[70%] 
            px-[4%] sm:px-[2%] pt-[2%] 
            text-xs sm:text-sm md:text-base 
            overflow-hidden ${orbitron.className}`}
				>
					<div className="text-black">STYLE = UTF - 1</div>
					<div className="text-black">ENERGY-PULSE: VIBRANT ORANGE</div>
					<div className="flex flex-row justify-end gap-2 sm:gap-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<Image
								key={i}
								src="/assets/X.svg"
								alt={`X ${i}`}
								width={14}
								height={14}
								className="sm:w-5 sm:h-5"
							/>
						))}
					</div>
					<div className="text-black">CODE-ESSENCE: CREATIVE CHAOS</div>
					<div className="flex justify-center">
						<Image
							className="w-2/3 sm:w-full"
							src="/assets/p1.svg"
							alt="P1 Graphic"
							width={180}
							height={180}
						/>
					</div>
				</div>

				{/* Right Column (Fades Out) */}
				<div
					ref={sideColumnsRightRef}
					className={`absolute right-0 top-0 flex flex-col justify-between 
            p-[4%] sm:p-[2.5%] 
            w-[40%] sm:w-[30%] md:w-[22%] 
            h-[60%] sm:h-[75%] 
            text-start overflow-hidden ${nostromoLight.className}`}
				>
					<div
						className="text-lg sm:text-2xl md:text-3xl text-black"
						style={{ fontWeight: 300 }}
					>
						<div>DISRUPT.</div>
						<div>CREATE.</div>
						<div>DOMINATE.</div>
					</div>
				</div>

				{/* Text Content - Different positioning for mobile vs desktop */}
				<div
					ref={paragraphRef}
					style={{ opacity: 0 }}
					className="absolute 
            top-[65%] left-[5%] w-[90%]
            md:top-[25%] md:left-[5%] md:w-[50%] lg:w-[45%] xl:w-[42%] 
            md:bottom-[10%] flex flex-col justify-between overflow-visible"
				>
					<div
						className="text-[#EA8244] text-justify text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-2 sm:p-3 lg:p-4 xl:p-5 leading-tight sm:leading-relaxed lg:leading-relaxed xl:leading-loose overflow-hidden"
						style={{ fontWeight: 600 }}
					>
						VinHack is a 36-hour hybrid hackathon that fosters collaboration,
						learning, and innovation. In teams of four, participants will tackle
						real-world problem statements across three rounds, developing
						impactful solutions and showcasing their applications. Alongside
						coding, VinHack features guest talks, workshops, and fun activities
						to inspire creativity and enhance technical skills. The event
						concludes with exciting prizes across multiple categories.
					</div>
				</div>

				{/* Circle (Moves & Scales) - Centered initially across all screens */}
				<div
					ref={circleRef}
					className="absolute 
            top-[25%] left-[50%] -translate-x-1/2 w-[70%] h-[35%]
            md:top-[20%] md:w-[50%] md:h-[60%]
            flex justify-center items-center overflow-visible"
				>
					<div className="h-full w-auto aspect-square max-w-full max-h-full relative">
						<CoinFlip
							frontImg="/assets/vinhack_pic.jpeg"
							backImg="/assets/vinhack_logo_orange.svg"
							isFlipping={isFlipping}
						/>
						{/* Circle Border Overlay */}
						<Image
							src="/assets/circle_border.svg"
							alt="Circle Border"
							fill
							className="absolute top-0 left-0 w-full h-full pointer-events-none scale-110"
							style={{ zIndex: 10 }}
						/>
					</div>
				</div>

				{/* Heading (Moves & Scales) */}
				<div
					ref={headingRef}
					className="absolute top-[85%] left-[5%] w-full lg:w-4/5 xl:w-3/4"
				>
					<h1
						className={`text-5xl md:text-4xl lg:text-7xl xl:text-7xl text-black font-normal leading-relaxed whitespace-nowrap tracking-widest ${t012.className}`}
					>
						WHAT'S VINHACK ?
					</h1>
				</div>

				{/* --- STATIC ELEMENTS --- */}
				<div
					ref={staticDotRef}
					className={`absolute right-0 top-[37.5%] p-[2.5%] w-[25%] h-[37.5%] text-center ${nostromoMedium.className} hidden md:block`}
				>
					<div
						className="text-4xl lg:text-5xl xl:text-6xl text-black"
						style={{ fontWeight: 700 }}
					>
						.01
					</div>
				</div>

				{/* Container for the cards and the NEW .01 */}
				<div
					className="absolute bottom-0 right-0 flex 
            w-full h-[15%] 
            md:w-1/3 md:h-[25%] 
            items-center justify-center gap-2 md:gap-4 lg:gap-6 xl:gap-10 p-0 overflow-hidden"
				>
					<div
						ref={newDotRef}
						style={{ opacity: 0 }}
						className={`text-center ${nostromoMedium.className}`}
					>
						<div
							className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-black"
							style={{ fontWeight: 700 }}
						>
							.01
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutVinhack;
