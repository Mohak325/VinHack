"use client";

import { useState } from "react";
import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";
import { ruigslay, nostromoLight, nostromoMedium } from "./fonts";
import FaqSection from "./components/FAQ";

import Footer from "./components/Footer";
import Tracks from "./components/Track";

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  const assetPaths = [
    "/assets/bottom_left_hand.svg",
    "/assets/top_right_hand.svg",
  ];

  return (
    <div className="">
      <LoadingScreen
        onCompletion={() => setLoadingFinished(true)}
        assetPaths={assetPaths}
      />
      <Hero
        isVisible={loadingFinished}
        ruigslayClassName={ruigslay.className}
        nostromoLightClassName={nostromoLight.className}
        nostromoMediumClassName={nostromoMedium.className}
      />
      {/* <Tracks/> */}
      <FaqSection/>
      <Footer/>
      
    </div>
  );
}

