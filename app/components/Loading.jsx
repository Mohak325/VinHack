"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [scrambledText, setScrambledText] = useState('VINHACK');
  const [rectangles, setRectangles] = useState(
    [...Array(20)].map(() => ({ height: 8, width: 4 }))
  ); // Initial sizes for rectangles
  const [loadingText, setLoadingText] = useState('SYSTEM LOADING');

  const systemLogs = [
    "Initializing quantum processors...",
    "Loading neural networks...",
    "Establishing secure connections...",
    "Calibrating hacking modules...",
    "Scanning for vulnerabilities...",
    "Compiling exploit libraries...",
    "Activating stealth protocols...",
    "Loading complete. Welcome hacker."
  ];

  const scrambleText = (text, intensity = 0.7) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    return text.split('').map(char => {
      if (Math.random() < intensity) {
        return chars[Math.floor(Math.random() * chars.length)];
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50;
    const steps = duration / interval;
    let step = 0;

    const progressTimer = setInterval(() => {
      step++;
      const newProgress = (step / steps) * 100;
      setProgress(newProgress);

      if (step >= steps) {
        clearInterval(progressTimer);
        setLoadingComplete(true);
        setScrambledText("VINHACK"); // Final unscrambled text
        setLoadingText("PROCESS COMPLETE");
      } else if (newProgress > 50) {
        setLoadingText("CONFIGURING...");
      }
    }, interval);

    // Logs updater
    const logInterval = setInterval(() => {
      if (logs.length < systemLogs.length) {
        setLogs(prev => [...prev, systemLogs[prev.length]]);
      }
    }, 600);

    // VINHACK scrambling updater (keeps running until complete)
    const scrambleInterval = setInterval(() => {
      if (!loadingComplete) {
        setScrambledText(scrambleText("VINHACK", 0.7));
      }
    }, 100);

    // Rectangle resizing updater
    const rectResizeInterval = setInterval(() => {
      if (!loadingComplete) {
        setRectangles(prev => prev.map(() => ({
          height: Math.floor(Math.random() * (12 - 4) + 4), // Random height between 4 and 12
          width: Math.floor(Math.random() * (6 - 2) + 2) // Random width between 2 and 6
        })));
      }
    }, 150);


    return () => {
      clearInterval(progressTimer);
      clearInterval(logInterval);
      clearInterval(scrambleInterval);
      clearInterval(rectResizeInterval);
    };
  }, [loadingComplete, logs.length]); // Added logs.length to dependency array to update logs correctly

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-orbitron">
      {/* Animated grid background */}

      {/* TOP SECTION */}
      {/* Topmost - hidden on mobile */}
      <div className="hidden md:block absolute top-0 left-0 w-full z-0">
        <Image
          src="/loading-topmost.png"
          alt="Topmost Decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Top - 75% on desktop, full on mobile */}
      <div className="absolute top-10 left-0 w-full flex justify-center z-0">
        <div className="w-full md:w-3/4">
          <Image
            src="/loading-top.png"
            alt="Top Decoration"
            width={1440}
            height={300}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-2xl w-full px-8 flex flex-col items-center justify-center">
        {/* System Loading Box */}
        <div className="border-2 border-orange-400 p-8 mb-8 relative bg-black bg-opacity-50 w-full">

          <div className="text-center relative bg-black px-2 mx-auto w-fit -top-5">
            <span className="text-orange-400 font-mono text-sm">{loadingText}</span>
          </div>
          {/* Progress bar container */}
          <div className="mb-4 relative">
            {/* Corner borders */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-orange-400"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-orange-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-orange-400"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-orange-400"></div>

            <div className="border border-orange-400 h-6 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-100 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 w-2 h-full bg-orange-300 animate-pulse"></div>
              </div>
            </div>
          </div>



          {/* Digital counter display */}
          <div className="text-center">
            <span className="text-orange-400 text-lg tracking-widest">
              {progress.toFixed(2).padStart(5, '0')} | 100.00
            </span>
          </div>
        </div>

        {/* Scrambled VINHACK */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-orange-400 tracking-wider animate-pulse">
            {scrambledText}
          </h2>
        </div>

        {/* System logs */}
        <div className="bg-black bg-opacity-70 border border-orange-400 h-32 overflow-hidden p-4 text-sm w-full font-consolas">
          {progress >= 100 ? (
            <div className="text-center flex items-center justify-center h-full">
              <div className="text-orange-400 text-lg">
                we are cooking something, stay tuned
              </div>
            </div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-green-400 mb-1 opacity-0 animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}>
                <span className="text-orange-400">[{new Date().toLocaleTimeString('en-IN')}]</span> {log}
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-3/4 mx-auto">
          <Image
            src="/loading-bottom.png"
            alt="Bottom Decoration"
            width={1440}
            height={300}
            className="w-full object-cover"
          />
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 flex justify-center relative z-10 w-full">
          <div className="flex space-x-1">
            {rectangles.map((rect, i) => (
              <div
                key={i}
                className="bg-orange-400 opacity-70 transition-all duration-75 ease-out"
                style={{
                  width: `${rect.width}px`,
                  height: `${rect.height}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="hidden md:block absolute bottom-0 left-0 w-full z-0">
          <Image
            src="/loading-bottommost.png"
            alt="Bottommost Decoration"
            width={1920}
            height={400}
            className="w-full object-cover"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
        .font-consolas {
          font-family: 'Consolas', 'Menlo', 'Monaco', monospace;
        }
      `}</style>
    </div>

  );
};

export default LoadingScreen;