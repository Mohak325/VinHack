"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [lines, setLines] = useState(
    [...Array(12)].map(() => ({ 
      height: 30, 
      width: 6,
      marginTop: 0,
      marginBottom: 0
    }))
  );
  const [loadingText, setLoadingText] = useState('SYSTEM LOADING');
  const [showDate, setShowDate] = useState(false);

  const targetText = 'VINHACK';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  
  // Create encrypted/decrypted text effect
  const generateRandomText = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
        setLoadingText("COMPLETED");
        setDisplayText(targetText); // Ensure final text is correct
        
        // Show date after a small delay
        setTimeout(() => {
          setShowDate(true);
        }, 500);
      }
    }, interval);

    // Encryption/Decryption effect for VINHACK
    const decryptionTimer = setInterval(() => {
      const currentProgress = (step / steps);
      let newText = '';
      
      for (let i = 0; i < targetText.length; i++) {
        // Gradually decrypt each character based on progress
        const charProgress = currentProgress * targetText.length;
        if (i < charProgress) {
          // Calculate probability of showing correct character
          const probability = Math.min((charProgress - i) * 2, 1);
          if (Math.random() < probability) {
            newText += targetText[i];
          } else {
            newText += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        } else {
          // Still fully encrypted
          newText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      }
      
      setDisplayText(newText);
      
      if (loadingComplete) {
        setDisplayText(targetText);
        clearInterval(decryptionTimer);
      }
    }, 100); // Update every 100ms for smooth effect

    // Line resizing updater - fixed container size to prevent shaking
    const lineResizeInterval = setInterval(() => {
      if (!loadingComplete) {
        setLines(prev => prev.map(() => {
          const totalHeight = 50; // Fixed total height for container
          const lineHeight = Math.floor(Math.random() * (40 - 20) + 20); // Random height between 20-40px
          const remainingSpace = totalHeight - lineHeight;
          const topMargin = Math.floor(Math.random() * remainingSpace);
          const bottomMargin = remainingSpace - topMargin;
          
          return {
            width: Math.floor(Math.random() * (10 - 4) + 4), 
            height: lineHeight,
            marginTop: topMargin,
            marginBottom: bottomMargin
          };
        }));
      }
    }, 120); // Slightly slower for smoother effect

    return () => {
      clearInterval(progressTimer);
      clearInterval(decryptionTimer);
      clearInterval(lineResizeInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-orbitron">
      {/* Google Fonts import */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
      
      <div className="hidden md:block absolute top-0 left-0 w-full z-0">
         <Image
           src="/loading-topmost.png"
           alt="Topmost Decoration"
           width={1920}
           height={400}
           className="w-full object-cover"
        />
       </div>

      {/* Top - 75% on desktop, full on mobile - with more space from top */}
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
            <span className="text-orange-400 font-orbitron text-sm">{loadingText}</span>
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

          {/* Digital counter display with Orbitron font */}
          <div className="text-center">
            <span className="text-orange-400 text-lg tracking-widest font-orbitron">
              {progress.toFixed(2).padStart(5, '0')} | 100.00
            </span>
          </div>
        </div>

        {/* VINHACK text with encryption/decryption effect - fixed position */}
        <div className="text-center mb-8 h-16 flex items-center justify-center">
          <h2 className="text-5xl font-bold text-orange-400 tracking-wider font-orbitron leading-none">
            {displayText || generateRandomText(7)}
          </h2>
        </div>

        {/* Date display when complete - fixed height to prevent movement */}
        <div className="text-center mb-8 h-12 flex items-center justify-center">
          {showDate && (
            <div>
              <div className="text-orange-400 text-2xl md:text-3xl font-bold font-orbitron">
                22-23 SEPTEMBER 2025
              </div>
              <div className="text-orange-400 text-md md:text-lg font-bold font-orbitron">
                We are cooking something! Stay Tuned!!!
              </div>
            </div>
          )}
        </div>

        {/* Animated lines - fixed container height to prevent shaking */}
        <div className="mt-5 md:mt-0 flex justify-center relative z-10 w-full">
          <div className="flex space-x-2 items-center" style={{ height: '50px' }}>
            {lines.map((line, i) => (
              <div
                key={i}
                className="bg-orange-400 opacity-70 transition-all duration-100 ease-out rounded-sm"
                style={{
                  width: `${line.width}px`,
                  height: `${line.height}px`,
                  marginTop: `${line.marginTop}px`,
                  marginBottom: `${line.marginBottom}px`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="fixed bottom-5 w-full md:w-[90%] z-0">
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
        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 10px #fb923c, 0 0 20px #fb923c, 0 0 30px #fb923c;
            opacity: 1;
          }
          50% { 
            text-shadow: 0 0 20px #fb923c, 0 0 30px #fb923c, 0 0 40px #fb923c;
            opacity: 0.8;
          }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;