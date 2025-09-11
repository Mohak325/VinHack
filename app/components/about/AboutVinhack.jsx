import Image from "next/image";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local"; // 1. Import localFont

const orbitron = Orbitron({ subsets: ["latin"] });

// 2. Load the local font with the correct path
const nostromo = localFont({
	src: [
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Light.otf",
			weight: "300", // Corresponds to font-light
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Medium.otf",
			weight: "500", // Corresponds to font-medium
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Bold.otf",
			weight: "700", // Corresponds to font-bold
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Heavy.otf",
			weight: "800", // Corresponds to font-extrabold
		},
		{
			path: "../../fonts/Nostromo Regular/NostromoRegular-Black.otf",
			weight: "900", // Corresponds to font-black
		},
	],
	display: "swap",
});

const AboutVinhack = () => {
	const renderIcons = (
		count = 5,
		width = 20,
		height = 20,
		src = "/X.svg",
		altPrefix = "X"
	) =>
		Array.from({ length: count }).map((_, i) => (
			<Image
				key={i}
				src={src}
				alt={`${altPrefix} ${i + 1}`}
				width={width}
				height={height}
			/>
		));
	return (
		<section
			className={`bg-[#fcd8b9] text-black h-screen w-full ${orbitron.className}`}
		>
			{/* <Image
				src="/grid-background.svg" // <-- Make sure this is the correct path to your SVG in the public folder
				alt="Background Grid"
				fill
				className="object-cover -z-10"
			/> */}
			<div className="flex h-[75%] w-full ">
				<div className="flex flex-col justify-between w-[25%] h-full px-[2%] pt-[0.3%] ">
					<div className="">STYLE = UTF - 1</div>
					<div>ENERGY-PULSE: VIBRANT ORANGE</div>
					<div className="flex flex-row justify-end gap-4">
						{renderIcons(5, 20, 20)}
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
				</div>
				<div className="grid w-[50%] h-full place-items-center pt-[2.5%]">
					<div className="bg-[#DAB89D] rounded-full aspect-square h-full w-auto max-w-full max-h-full border-8 border-black col-start-1 row-start-1"></div>
					<Image
						src="/circle_border.svg"
						alt="Circle Border"
						width={500}
						height={500}
						className="w-full h-auto col-start-1 row-start-1 px-[5%]"
					/>
				</div>
				<div
					className={`flex flex-col justify-between p-[2.5%] w-[25%] h-full  text-start ${nostromo.className}`}
				>
					<div className="text-[2em] h-[30%] " style={{ fontWeight: 300 }}>
						<div>DISRUPT.</div>
						<div>CREATE.</div>
						<div>DOMINATE.</div>
					</div>
					<div
						className="justify-self-center text-center  text-5xl h-[50%] ${nostromo.className}"
						style={{ fontWeight: 700 }}
					>
						.02
					</div>
				</div>
			</div>
			<div className="flex h-[25%] w-full  items-center">
				<div className="flex w-2/3 h-full  items-center justify-center text-center">
					<Image
						src="/vinhack_text.svg"
						alt="Vinhack Text"
						width={400}
						height={100}
						className="w-full h-auto py-3.5 pl-3.5 object-contain"
					/>
				</div>
				<div className="flex w-1/3 h-full items-center justify-center gap-10 p-0">
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
