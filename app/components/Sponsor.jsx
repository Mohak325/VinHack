import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GridPlusBackground } from './Grid';
import { orbitron, nostromoLight, nostromoMedium, ruigslay } from '../fonts';
import localFont from 'next/font/local';

const type12 = localFont({ src: '../fonts/Type12.ttf' });
const SlideContent = () => (
    <>
        <p className={`${nostromoLight.className}`}>
            Insurance companies often rely on manual inspections of damage images—such as those from car accidents or property incidents—to assess claim validity and determine repair costs. This process can be slow, inconsistent, and prone to human error.
        </p>
        <p className={`${nostromoLight.className}`}>
            Your task is to develop an AI-based system capable of analyzing uploaded damage images to:
        </p>
        <div className="space-y-2">
            <p className={`flex items-start ${nostromoLight.className}`}><span className="font-bold mr-2">&gt;</span>Classify the severity of the damages (e.g., minor, moderate, severe)</p>
            <p className={`flex items-start ${nostromoLight.className}`}><span className="font-bold mr-2">&gt;</span>Estimate the corresponding repair costs based on visual damage features</p>
            <p className={`flex items-start ${nostromoLight.className}`}><span className="font-bold mr-2">&gt;</span>Detect fraudulent or tampered images to prevent fraudulent claims</p>
        </div>
        <p className={`${nostromoLight.className}`}>
            A significant challenge is to achieve these objectives with limited available training data, ensuring the system's accuracy and reliability. Your solution should aim to enhance the speed, consistency, and integrity of the damage assessment process in insurance claims.
        </p>
    </>
);

const Slide = ({ imageSrc, imageAlt, imageOnLeft = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen w-full"
        >
            <div className="h-full w-full">
                <GridPlusBackground>
                    <div className="h-full w-full flex flex-col items-center justify-center p-8 font-mono text-[#333]">
                        <div className="w-full max-w-6xl">
                            <header className="text-center mb-8">
                                <h1 className={`font-sans uppercase font-extrabold text-4xl lg:text-6xl tracking-[8px] ${type12.className}`}>
                                    SPONSORS TRACK
                                </h1>
                                <h2 className={`font-sans font-medium text-xl lg:text-2xl tracking-[2px] mt-2 ${orbitron.className}`}>
                                    AI-Based Claims Image Assessment
                                </h2>
                            </header>
                            <main className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${!imageOnLeft ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="lg:flex-1 flex justify-center">
                                    <div className="relative h-[300px] w-[300px] md:h-[350px] md:w-[350px] overflow-hidden rounded-full border-4 border-black bg-white">
                                        <Image
                                            src={imageSrc}
                                            alt={imageAlt}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                                <div className="lg:flex-1 space-y-4 text-base md:text-lg">
                                    <SlideContent />
                                </div>
                            </main>
                        </div>
                    </div>
                </GridPlusBackground>
            </div>
        </motion.div>
    );
};

const Sponsor = () => {
    return (
        <div>
            <Slide
                imageSrc="/assets/sponsors_track1.png"
                imageAlt="Person with VR headset pointing at constellations"
                imageOnLeft={true}
            />
            <Slide
                imageSrc="/assets/sponsor_track2.png"
                imageAlt="Robot and human collaborating over a brain diagram"
                imageOnLeft={false}
            />
        </div>
    );
};

export default Sponsor;