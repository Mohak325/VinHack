"use client";

import React, { useState, useEffect } from 'react';
import Notch from './notch.jsx';

const RulesPage = () => {
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
    "Teams must have 2–4 participants (no solo participation, no multiple teams).",
    "Hackathon runs for 36 hours continuously.",
    "All work must be done during the event; only open-source tools/libraries allowed; any AI tools can be used.",
    "Any tech stack may be used; projects must align with at least one track.",
    "Internet access is permitted. Submissions must include: working prototype/demo, pitch deck or documentation, and GitHub repo with source code.",
    "Late submissions will not be accepted.",
    "Judging based on novelty, feasibility & impact, tech implementation, design & UX, open-source usage, and pitching.",
    "Judges’ decisions are final.",
    "Respect all participants and organizers; misconduct leads to disqualification.",
    "Teams must remain onsite throughout the hackathon."
  ];

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative w-full h-full p-4">
        {/* Black border and corner fills */}
        <div className="absolute inset-0 bg-black" style={{ clipPath: "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))" }}></div>
        <div className="absolute top-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 left-0 w-[30px] h-[30px] bg-black"></div>
        <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black"></div>

        {/* Notches */}
        <Notch position="top" soundOn={soundOn} onToggleSound={handleToggleSound} />
        <Notch position="left" tokens={tokenizeCoords(coords.x, coords.y)} />
        <Notch position="right" onToggleMenu={handleToggleMenu} />
        <Notch position="bottom" />

        {/* Inner content container */}
        <div
          className="relative w-full h-full bg-[#D5D1BE] flex flex-col items-center justify-center p-5 md:p-10"
          style={{ clipPath: "polygon(0% 30px, 30px 0%, calc(100% - 30px) 0%, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0% calc(100% - 30px))" }}
        >
          <div className="w-full max-w-5xl">
            {/* --- MODIFIED HEADING --- */}
            <h1 className="text-center text-5xl md:text-7xl tracking-widest font-bold mb-12" style={{ 
              fontFamily: '"Orbitron", sans-serif',
              color: '#000' // Text color for heading set to black
            }}>
              RULES
            </h1>
            {/* --- END MODIFIED HEADING --- */}
            <ul className="list-none p-0 m-0 flex flex-col gap-6">
              {rules.map((rule, index) => (
                <li key={index} style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  fontSize: '1.2rem',   
                  lineHeight: '1.7',
                  color: '#000' // Text color for rules set to black
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

export default RulesPage;
