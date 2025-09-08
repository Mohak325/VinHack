"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
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
  const [animatedProgress, setAnimatedProgress] = useState("00.00");
  const [hasMounted, setHasMounted] = useState(false); // State to prevent hydration mismatch

  // States for individual decryption animations
  const [displayText, setDisplayText] = useState('');
  const [animatedDate, setAnimatedDate] = useState('');
  const [animatedTagline, setAnimatedTagline] = useState('');

  const targetText = 'VINHACK';
  const targetDate = '22-23 SEPTEMBER 2025';
  const targetTagline = 'We are cooking something. Stay Tuned!';
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
    setHasMounted(true); // Set to true after initial client render

    // --- TIMER DECLARATIONS ---
    let progressTimer;
    let vinhackDecryptionTimer;
    let dateDecryptionTimer;
    let taglineDecryptionTimer;
    let lineResizeInterval;

    // --- BAR ANIMATION (INDEFINITE) ---
    let wavePhase = 0;
    lineResizeInterval = setInterval(() => {
        wavePhase += 0.2;
        const newLines = [...Array(12)].map((_, i) => {
            const center = 5.5;
            const dist = Math.abs(i - center);
            const wave = Math.sin(wavePhase - dist * 0.5);
            const height = 20 + (wave + 1) * 10;
            const totalHeight = 50;
            const remainingSpace = totalHeight - height;
            const topMargin = remainingSpace / 2;
            return { width: 6, height, marginTop: topMargin, marginBottom: topMargin };
        });
        setLines(newLines);
    }, 100);

    // --- DECRYPTION ANIMATION LOGIC ---
    const animateText = (target, setter, onComplete) => {
        return setInterval(() => {
            setter(prev => {
                if (prev === target) {
                    onComplete(); // Clears its own interval
                    return target;
                }
                let newText = '';
                for (let i = 0; i < target.length; i++) {
                    if (i < prev.length && prev[i] === target[i]) {
                        newText += target[i];
                    } else if (Math.random() < 0.15) {
                        newText += target[i];
                    } else {
                        newText += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                }
                return newText;
            });
        }, 100);
    };


    // --- MAIN PROGRESS SEQUENCE ---
    const duration = 5000;
    const interval = 50;
    let startTime = Date.now();
    let dateAnimationStarted = false;

    progressTimer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const t = elapsedTime / duration;
      const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const newProgress = Math.min(easedT * 100, 100);
      setProgress(newProgress);

      // Trigger date animation at 90%
      if (newProgress >= 90 && !dateAnimationStarted) {
          dateAnimationStarted = true;
          setShowDate(true);
          dateDecryptionTimer = animateText(targetDate, setAnimatedDate, () => clearInterval(dateDecryptionTimer));
          taglineDecryptionTimer = animateText(targetTagline, setAnimatedTagline, () => clearInterval(taglineDecryptionTimer));
      }

      // Update progress text
      if (newProgress < 100) {
        const decimals = Math.floor(Math.random() * 90 + 10);
        setAnimatedProgress(`${Math.floor(newProgress).toFixed(0).padStart(2, '0')}.${decimals}`);
      }

      // On Completion
      if (elapsedTime >= duration) {
        clearInterval(progressTimer);
        clearInterval(vinhackDecryptionTimer); // Stop vinhack decryption
        
        // Final state setters
        setProgress(100);
        setAnimatedProgress("100.00");
        setLoadingComplete(true);
        setLoadingText("ACCESS GRANTED");
        
        // Ensure final text is correct
        setDisplayText(targetText);
        setAnimatedDate(targetDate);
        setAnimatedTagline(targetTagline);
      }
    }, interval);

    // VINHACK Decryption
    vinhackDecryptionTimer = animateText(targetText, setDisplayText, () => clearInterval(vinhackDecryptionTimer));


    // --- CLEANUP FUNCTION ---
    // This will run if the component unmounts, ensuring no memory leaks.
    return () => {
      clearInterval(progressTimer);
      clearInterval(vinhackDecryptionTimer);
      clearInterval(dateDecryptionTimer);
      clearInterval(taglineDecryptionTimer);
      clearInterval(lineResizeInterval);
    };
  }, []); // Empty dependency array ensures this effect runs only ONCE.

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden font-orbitron">
      {/* Google Fonts import */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
      
      <div className="hidden md:block absolute top-0 left-0 w-full z-0">
         <Image src="/loading-topmost.png" alt="Topmost Decoration" width={1920} height={400} className="w-full object-cover" />
       </div>

      {/* Top - 75% on desktop, full on mobile - with more space from top */}
      <div className="absolute top-10 left-0 w-full flex justify-center z-0">
        <div className="w-full md:w-3/4">
          <Image src="/loading-top.png" alt="Top Decoration" width={1440} height={300} className="w-full object-cover" />
        </div>
      </div>
      
      {/* Main container */}
      <div className="relative z-10 max-w-2xl w-full px-8 flex flex-col items-center justify-center">
        {/* System Loading Box */}
        <div className="border-2 border-[#E86100] p-8 mb-8 relative bg-black bg-opacity-50 w-full">
          <div className="text-center relative bg-black px-2 mx-auto w-fit -top-5">
            <span className={`text-[#E86100] font-orbitron text-sm ${loadingComplete ? 'fade-in' : ''}`}>{loadingText}</span>
          </div>
          
          {/* Progress bar container */}
          <div className="mb-4 relative">
            {/* Corner borders */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#E86100]"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-[#E86100]"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-[#E86100]"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#E86100]"></div>

            <div className="border border-[#E86100] h-6 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E86100] to-[#E86100] transition-all duration-100 ease-linear relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 w-2 h-full bg-[#E86100] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Digital counter display with Orbitron font */}
          <div className="text-center">
            <span className="text-[#E86100] text-lg tracking-widest font-orbitron">
              {animatedProgress}%
            </span>
          </div>
        </div>

        {/* VINHACK text with encryption/decryption effect - fixed position */}
        <div className="text-center mb-8 h-16 flex items-center justify-center">
          <h2 className="text-5xl font-bold text-[#E86100] tracking-wider font-orbitron leading-none">
            {hasMounted ? (displayText || generateRandomText(targetText.length)) : ''}
          </h2>
        </div>

        {/* Date display when complete - fixed height to prevent movement */}
        <div className="text-center mb-8 h-12 flex items-center justify-center">
          {showDate && (
            <div className="fade-in">
              <div className="text-[#E86100] text-2xl md:text-3xl font-bold font-orbitron">
                {hasMounted ? (animatedDate || generateRandomText(targetDate.length)) : ''}
              </div>
              <div className="text-[#E86100] text-md md:text-lg font-bold font-orbitron">
                {hasMounted ? (animatedTagline || generateRandomText(targetTagline.length)) : ''}
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
                className="bg-[#E86100] opacity-70 transition-all duration-100 ease-out rounded-sm"
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
          <Image src="/loading-bottommost.png" alt="Bottommost Decoration" width={1920} height={400} className="w-full object-cover" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;