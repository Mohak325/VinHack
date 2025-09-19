"use client";

import { useState, useRef, useEffect } from "react";
import { t012, nostromoLight, nostromoMedium } from "../../fonts";
import Sponsor from "./Sponsor";
import { tracksData } from "./data";

const TracksDesktop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const finalAnimationTarget = (tracksData.length - 1) / tracksData.length;
  const containerHeightVh =
    100 + (tracksData.length - 1) * 100 * finalAnimationTarget;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      const animationProgress = progress * finalAnimationTarget;
      setScrollProgress(animationProgress);
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [finalAnimationTarget]);

  const progressTotal = scrollProgress * tracksData.length;
  const currentCardFloat = Math.floor(progressTotal);
  const progressWithinCard = progressTotal - currentCardFloat;

  let circleX, circleY;
  const isCurrentSideEven = currentCardFloat % 2 === 0;
  const topBound = -35;
  const bottomBound = 35;
  const verticalTravel = bottomBound - topBound;

  if (progressWithinCard < 0.5) {
    const descentProgress = progressWithinCard * 2;
    circleY = topBound + descentProgress * verticalTravel;
    circleX = isCurrentSideEven ? 75 : 25;
  } else {
    const transitionProgress = (progressWithinCard - 0.5) * 2;
    circleY = bottomBound - transitionProgress * verticalTravel;
    const startX = isCurrentSideEven ? 75 : 25;
    const endX = isCurrentSideEven ? 25 : 75;
    circleX = startX + transitionProgress * (endX - startX);
  }

  const circleStyle = {
    top: "50%",
    left: `${circleX}%`,
    transform: `translate(-50%, ${circleY}%)`,
  };

  const firstCard = tracksData[0];
  const introTransitionEnd = 0.1;
  const introOpacity = 1 - Math.min(1, progressTotal / introTransitionEnd);
  const currentImageIndex = Math.min(tracksData.length - 1, currentCardFloat);
  const currentImageUrl = tracksData[currentImageIndex]?.imageUrl;

  const circleBgStyle = {
    backgroundImage: `url(${currentImageUrl})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundColor: "rgb(218,184,157)",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <div className="pt-16 sm:pt-20 text-center">
        <h2
          className={`text-5xl sm:text-6xl lg:text-8xl font-black tracking-widest text-black ${t012.className}`}
        >
          TRACKS
        </h2>
      </div>

      <Sponsor />

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${containerHeightVh}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-x-hidden">
          <div className="relative w-full h-full p-4 sm:p-8 md:p-12">
            <div className="relative w-full h-full">
              <div
                className="absolute w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 z-10"
                style={circleStyle}
              >
                <div
                  className="w-full h-full rounded-full border-4 border-black transition-all duration-300"
                  style={circleBgStyle}
                ></div>
              </div>
              <div
                className="absolute w-[42%] text-left pr-4"
                style={{
                  top: "50%",
                  left: "75%",
                  transform: "translate(-160%, -50%)",
                  opacity: introOpacity,
                  pointerEvents: introOpacity > 0 ? "auto" : "none",
                }}
              >
                <p
                  className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}
                >
                  {firstCard.id}
                </p>
                <p
                  className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoMedium.className}`}
                >
                  {firstCard.title}
                </p>
                <p
                  className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}
                >
                  {firstCard.description}
                  <a
                    href="#"
                    className="font-bold text-black/70 hover:text-black transition-colors duration-300 ml-1"
                  >
                    View More
                  </a>
                </p>
              </div>
              <div className="relative w-full h-full">
                {tracksData.map((track, index) => {
                  const isCardEven = index % 2 === 0;
                  const textAlign = isCardEven ? "text-left" : "text-right";
                  const contentAlign = isCardEven ? "items-start" : "items-end";
                  const position = isCardEven ? "left-0" : "right-0";
                  const padding = isCardEven
                    ? "pl-16 lg:pl-20"
                    : "pr-20 lg:pr-24";
                  const firstCardMargin =
                    index === 0 ? "mt-24 sm:mt-32" : "";
                  const verticalOffset = index === 0 ? 0 : 25;
                  const cardOpacity = index === 0 ? 1 - introOpacity : 1;

                  const combinedStyle = {
                    transform: `translateY(${
                      (index - scrollProgress * tracksData.length) * 100 +
                      verticalOffset
                    }%)`,
                    opacity: cardOpacity,
                  };

                  return (
                    <div
                      key={track.id}
                      className={`absolute w-[42%] h-full flex flex-col justify-center ${textAlign} ${contentAlign} ${position} ${padding} ${firstCardMargin}`}
                      style={combinedStyle}
                    >
                      <p
                        className={`font-bold text-black text-4xl lg:text-6xl xl:text-7xl ${nostromoMedium.className}`}
                      >
                        {track.id}
                      </p>
                      <p
                        className={`text-black/70 mt-2 text-base lg:text-xl xl:text-2xl ${nostromoMedium.className}`}
                      >
                        {track.title}
                      </p>
                      <p
                        className={`leading-relaxed text-black/60 mt-4 text-sm lg:text-base xl:text-lg ${nostromoLight.className}`}
                      >
                        {track.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracksDesktop;
