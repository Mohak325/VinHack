"use client";
import React, { useState, useEffect } from 'react';
import Notch from './Notch.jsx';

const CocPage = () => {
  const [soundOn, setSoundOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleToggleSound = () => setSoundOn(!soundOn);
  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const tokenizeCoords = (x, y) => {
    const formatNum = (num) => num.toString().padStart(4, "0").split("");
    return ["X.", ...formatNum(x), "//", "Y.", ...formatNum(y)];
  };

  const rules = [
    "VinnovateIT believes strongly in inclusivity. Everyone, who wants to join the event, is welcome. And we assure you that, all the submissions will be evaluated irrespective of any bias with respect to whatsoever. We will always work to maintain a welcoming and safe environment for everyone.",
    "If you witness an incident which you feel goes against this policy, and violates the rights of any individual including you, feel free to reach out to anyone on the organizing team. You can identify our team members, with the ID card they are wearing which has “Core” or “Board” title.",
    "We ensure, all such reports will be anonymous, and strict actions will be taken against such incidents.",
    "If you're joining us via online mode, feel free to reach out to any of organizing team members via personal chat on Discord, the organizers have a role of “VinnovateIT”.",
    "TL;DR: Be respectful towards everyone, be it participants, organizers, or anyone related to the event. Incase of any incidents with conduct not being abided, feel free to reach out to anyone on organizing team."
  ];

  return (
    <div className="fixed inset-0 bg-black">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="relative w-full h-full p-4">
        <div className="absolute inset-0" style={{ clipPath: "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))" }}></div>
        <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black"></div>

        <Notch position="top" soundOn={soundOn} onToggleSound={handleToggleSound} />
        <Notch position="left" tokens={tokenizeCoords(coords.x, coords.y)} />
        <Notch position="right" onToggleMenu={handleToggleMenu} />
        <Notch position="bottom" />

        <div
          className="relative w-full h-full flex flex-col items-center justify-start pt-16 p-6 sm:p-8 md:p-12"
          style={{
            clipPath: "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))",
            backgroundColor: '#D5D1BE',
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.09) 1px, transparent 1px),
              url("data:image/svg+xml,%3csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cg stroke='%23F5B37F' stroke-width='1'%3e%3cpath d='M 50 46 V 54 M 46 50 H 54'/%3e%3c/g%3e%3c/svg%3e")
            `,
            backgroundSize: '40px 40px, 40px 40px, 100px 100px'
          }}
        >
          <div className="w-full max-w-6xl overflow-y-auto p-6 hide-scrollbar">
            <h1 className="text-center text-4xl sm:text-5xl md:text-7xl tracking-widest font-bold mt-8" style={{
              fontFamily: '"Orbitron", sans-serif',
              color: '#000'
            }}>
              CODE OF CONDUCT
            </h1>
            <ul className="list-none p-0 m-0 flex flex-col gap-4 md:gap-6 mt-20">
              {rules.map((rule, index) => (
                <li key={index} className="text-base sm:text-lg md:text-xl" style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  lineHeight: '1.7',
                  color: '#000'
                }}>
                  • {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocPage;
