"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import GlowButton from "./GlowButton.jsx";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";

const ruigslay = localFont({ src: "../../public/fonts/ruigslay/Ruigslay.ttf" });
const nostromo = localFont({ src: "../../public/fonts/nostromo/nostromo-regular-black.otf" });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

const formatCoord = (num) => num.toString().padStart(4, '0');

export default function Home() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  const leftSideText = [
    "X.",
    ...formatCoord(coords.x).split(''),
    "//",
    "Y.",
    ...formatCoord(coords.y).split(''),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <main className="flex-1 flex flex-col items-center justify-center text-center relative px-6">
        
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-start gap-y-0.5 text-xs tracking-widest font-mono"
          style={{ color: "#F5B37F" }}
        >
          {leftSideText.map((token, i) => (
            <span key={i} className="leading-tight">
              {token}
            </span>
          ))}
        </div>

        <h1 className={`text-[11rem] font-bold text-orange-500 ${ruigslay.className}`}>
          VinHack
        </h1>

        <h2 className={`text-4xl font-bold mt-6 text-orange-500 ${nostromo.className} transform -translate-y-10`}>
          HAVEN’T REGISTERED YET?
        </h2>

        <p className={`mt-4 text-2xl text-[#D5D1BE] transform -translate-y-6 ${poppins.className}`}>What are you waiting for?</p>
        <p className={`mt-1 text-2xl font-semibold text-[#D5D1BE] transform -translate-y-6 ${poppins.className}`} >REGISTER NOW!</p>

        <div className="mt-6">
          <a
            href="https://gravitas.vit.ac.in/events/5fceeb67-a8ca-4ab9-9419-eb3f9b9d6b69"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlowButton className={nostromo.className}>REGISTER NOW</GlowButton>
          </a>
        </div>

        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#F5B37F] z-10 flex flex-col space-y-0 font-mono hover:text-white transition-colors duration-300">
          <span>M</span>
          <span>E</span>
          <span>N</span>
          <span>U</span>
        </button>
      </main>

      <footer className="bg-[#d6d1c4] text-black py-12 px-20 relative rounded-t-3xl">
        <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Image
              src="/logo.png"
              alt="VinnovateIT Logo"
              width={250}
              height={45}
            />
            
            <p className={`mt-2 text-base leading-relaxed ${poppins.className}`}>
              VIT, VELLORE CAMPUS <br />
              VELLORE - 632014 <br />
              TAMILNADU, INDIA
            </p>
            <p className={`mt-2 text-xs ${poppins.className}`}>
              © 2025 VinnovateIT, Vellore Institute of Technology
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-11">
              <a href="https://www.instagram.com/vinnovateit/?hl=en" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaInstagram /></a>
              <a href="https://x.com/v_innovate_it?lang=en" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaTwitter /></a>
              <a href="https://github.com/vinnovateit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaGithub /></a>
              <a href="https://www.linkedin.com/company/v-innovate-it/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaLinkedin /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaYoutube /></a>
              <a href="https://www.facebook.com/VinnovateIT/about/?_rdr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white rounded text-xl hover:opacity-75 transition-opacity"><FaFacebook /></a>
            </div>
            <GlowButton className={nostromo.className}>LET’S CONNECT!</GlowButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
