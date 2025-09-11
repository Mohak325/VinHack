"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import GlowButton from "./GlowButton.jsx";
import ScrambleText from './ScrambleText.jsx';
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

export default function Footer() {
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

  // --- UPDATED ANIMATION STYLES ---
  const animationStyles = `
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInFromBack {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-side {
      animation-duration: 1.5s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
    }
    .animate-main {
      animation: fadeInFromBack 1s ease-out forwards;
      animation-delay: 0.5s; /* Delay the main content animation */
      opacity: 0; /* Start hidden */
    }
    .fade-in-left {
      animation-name: fadeInLeft;
    }
    .fade-in-right {
      animation-name: fadeInRight;
    }
  `;

  return (
    <div 
      className="min-h-screen flex flex-col bg-black text-white font-sans"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cg stroke='%23F5B37F' stroke-width='1'%3e%3cpath d='M 50 47 V 53 M 47 50 H 53'/%3e%3c/g%3e%3c/svg%3e")`,
        backgroundSize: '100px 100px'
      }}
    >
      <style>{animationStyles}</style>
      
      {/* Apply delay to the main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center relative px-4 sm:px-6 animate-main">
        
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-start gap-y-0.5 text-xs tracking-widest font-mono animate-side fade-in-left"
          style={{ color: "#F5B37F" }}
        >
          {leftSideText.map((token, i) => (
            <span key={i} className="leading-tight">
              {token}
            </span>
          ))}
        </div>

        <ScrambleText
          as="h1"
          text="VinHack"
          className={`text-7xl sm:text-8xl md:text-[11rem] font-bold text-orange-500 ${ruigslay.className}`}
        />

        <ScrambleText
          as="h2"
          text="HAVEN’T REGISTERED YET?"
          className={`text-2xl md:text-4xl font-bold mt-6 text-orange-500 ${nostromo.className}`}
        />

        <ScrambleText
          as="p"
          text="What are you waiting for?"
          className={`mt-4 text-xl md:text-3xl text-[#D5D1BE] ${poppins.className}`}
        />

        <ScrambleText
          as="p"
          text="REGISTER NOW!"
          className={`mt-4 text-xl md:text-3xl font-semibold text-[#D5D1BE] ${poppins.className}`}
        />

        <div className="mt-10 mb-8">
          <a
            href="https://gravitas.vit.ac.in/events/5fceeb67-a8ca-4ab9-9419-eb3f9b9d6b69"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlowButton className={nostromo.className}>REGISTER NOW</GlowButton>
          </a>
        </div>

        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#F5B37F] z-10 hidden md:flex flex-col space-y-0 font-mono hover:text-white transition-colors duration-300 animate-side fade-in-right">
          <span>M</span>
          <span>E</span>
          <span>N</span>
          <span>U</span>
        </button>
      </main>

      <footer className="bg-[#d6d1c4] text-black py-8 md:py-12 px-6 md:px-20 relative rounded-t-3xl">
        <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="VinnovateIT Logo"
              width={200} 
              height={36}
            />
            
            <p className={`mt-4 text-sm md:text-base leading-relaxed ${poppins.className}`}>
              VIT, VELLORE CAMPUS <br />
              VELLORE - 632014 <br />
              TAMILNADU, INDIA
            </p>
            <p className={`mt-4 text-xs ${poppins.className}`}>
              © 2025 VinnovateIT, Vellore Institute of Technology
            </p>
          </div>

          <div className="mt-8 md:mt-0 flex flex-col items-center">
            <div className="flex space-x-4 mb-10">
              <a href="https://www.instagram.com/vinnovateit/?hl=en" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaInstagram /></a>
              <a href="https://x.com/v_innovate_it?lang=en" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaTwitter /></a>
              <a href="https://github.com/vinnovateit" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaGithub /></a>
              <a href="https://www.linkedin.com/company/v-innovate-it/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaLinkedin /></a>
              <a href="https://www.youtube.com/channel/UClqr0ir3N1_sG4ubZjEDe3g" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaYoutube /></a>
              <a href="https://www.facebook.com/VinnovateIT/about/?_rdr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black flex items-center justify-center text-white text-xl transition-all duration-300 hover:text-orange-400 hover:shadow-[0_0_15px_rgba(245,179,127,0.8)]"><FaFacebook /></a>
            </div>
            <GlowButton className={nostromo.className}>LET’S CONNECT!</GlowButton>
          </div>
        </div>
      </footer>
    </div>
  );
}
