"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CoinFlip = ({ frontImg, backImg, isFlipping }) => {
	return (
		<div className="w-full h-full" style={{ perspective: 1000 }}>
			<motion.div
				className="relative w-full h-full"
				style={{ transformStyle: "preserve-3d" }}
				animate={{ rotateY: isFlipping ? 180 : 0 }}
				transition={{ duration: 0.7, ease: "easeInOut" }}
			>
				{/* Front Face */}
				<div
					className="absolute w-full h-full bg-[#DAB89D] rounded-full border-8 border-black flex items-center justify-center"
					style={{ backfaceVisibility: "hidden" }}
				>
					<Image
						src={frontImg}
						alt="Front Image"
						width={400}
						height={400}
						className="p-8"
					/>
				</div>

				{/* Back Face */}
				<div
					className="absolute w-full h-full bg-[#DAB89D] rounded-full border-8 border-black flex items-center justify-center"
					style={{
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					<Image
						src={backImg}
						alt="Back Image"
						width={400}
						height={400}
						className="p-8"
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default CoinFlip;
