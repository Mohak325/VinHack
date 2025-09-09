"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import DecryptingText from "./DecryptingText";
import AnimatedLines from "./AnimatedLines";

const LoadingScreen = ({ onCompletion }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loadingText, setLoadingText] = useState("SYSTEM LOADING");
  const [showDate, setShowDate] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const targetText = "VINHACK";
  const targetDate = "22-23 SEPTEMBER 2025";
  const targetTagline = "We are cooking something. Stay Tuned!";

  useEffect(() => {
    const minLoadingTime = 3000; // Set minimum loading time to 3 seconds

    // Array of assets to preload for the main page
    const assetsToLoad = [
      "/loading-topmost.png",
      "/loading-top.png",
      "/loading-bottommost.png",
      "/assets/top_right_hand.svg",
      "/assets/bottom_left_hand.svg",
    ];

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = (loadedCount / assetsToLoad.length) * 100;
      setProgress(newProgress);
    };

    // Promise that resolves when all assets are loaded
    const assetsLoadedPromise = new Promise((resolve) => {
      if (assetsToLoad.length === 0) {
        resolve();
        return;
      }
      const imagePromises = assetsToLoad.map((src) => {
        return new Promise((resolveImage) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            updateProgress();
            resolveImage();
          };
          img.onerror = () => {
            console.warn(`Could not load asset: ${src}`);
            updateProgress();
            resolveImage(); // Resolve even on error
          };
        });
      });
      Promise.all(imagePromises).then(resolve);
    });

    // Promise that resolves after the minimum time
    const minTimePromise = new Promise((resolve) => {
      setTimeout(resolve, minLoadingTime);
    });

    // When both asset loading and minimum time are complete...
    Promise.all([assetsLoadedPromise, minTimePromise]).then(() => {
      // Use a short timeout to ensure 100% is displayed briefly
      setTimeout(() => {
        setLoadingText("ACCESS GRANTED");
        setLoadingComplete(true);
        onCompletion(); // Signal to the parent page to show the Hero component
        setIsFadingOut(true); // Start the fade-out animation
      }, 300);
    });
  }, [onCompletion]);

  // Show the date decryption effect near the end of the loading process
  useEffect(() => {
    if (progress >= 90) {
      setShowDate(true);
    }
  }, [progress]);

  return (
    <div
      className={`min-h-screen bg-black flex items-center justify-center fixed inset-0 z-50 overflow-hidden font-orbitron transition-opacity duration-1000 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="hidden md:block absolute top-0 left-0 w-full z-0">
        <Image
          src="/loading-topmost.png"
          alt="Topmost Decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>
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

      <div className="relative z-10 max-w-2xl w-full px-8 flex flex-col items-center justify-center">
        <ProgressBar progress={progress} loadingText={loadingText} />

        <div className="text-center mb-8 h-16 flex items-center justify-center">
          <DecryptingText
            targetText={targetText}
            start={true}
            isComplete={loadingComplete}
            className="text-5xl font-bold text-[#E86100] tracking-wider font-orbitron leading-none"
          />
        </div>

        <div className="text-center mb-8 h-12 flex items-center justify-center">
          {showDate && (
            <div className="fade-in">
              <DecryptingText
                targetText={targetDate}
                start={showDate}
                isComplete={loadingComplete}
                className="text-[#E86100] text-2xl md:text-3xl font-bold font-orbitron"
              />
              <DecryptingText
                targetText={targetTagline}
                start={showDate}
                isComplete={loadingComplete}
                className="text-[#E86100] text-md md:text-lg font-bold font-orbitron"
              />
            </div>
          )}
        </div>

        <AnimatedLines />

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
        .fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
