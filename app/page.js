"use client";
import { useState } from "react";
import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";
import { ruigslay, nostromoLight, nostromoMedium, orbitron } from "./fonts";
import FaqSection from "./components/FAQ";
import Border from "./components/Border";

export default function Home() {
  // State to manage the loading screen's visibility and fade-out animation
  const [isAppLoading, setIsAppLoading] = useState(true);
  // State to mount the main content after loading
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  // This function is called by LoadingScreen when it's done
  const handleLoadingComplete = () => {
    // 1. Mount the Hero and other main components immediately.
    // They will render underneath the still-visible loading screen.
    setIsHeroVisible(true);

    // 2. Wait a moment, then trigger the fade-out of the loading screen.
    setTimeout(() => {
      setIsAppLoading(false);
    }, 100);
  };

  const assetPaths = [
    "/assets/bottom_left_hand.svg",
    "/assets/top_right_hand.svg",
  ];

  // Pass font class names to components that need them
  const fontClassNames = {
    ruigslayClassName: ruigslay.className,
    nostromoLightClassName: nostromoLight.className,
    nostromoMediumClassName: nostromoMedium.className,
  };

  return (
    <main className="relative bg-[#D5D1BE] text-white">
      {isAppLoading && (
        <LoadingScreen
          onCompletion={handleLoadingComplete}
          assetPaths={assetPaths}
          isFadingOut={!isAppLoading}
        />
      )}

      {isHeroVisible && (
        <Border {...fontClassNames}>
          <Hero {...fontClassNames} isVisible={isHeroVisible} />
          <FaqSection />
        </Border>
      )}
    </main>
  );
}

