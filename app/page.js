"use client";

import { useState } from "react";
import LoadingScreen from "./components/Loading";
import Hero from "./components/Hero";

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);
  return (
    <div className="">
      <LoadingScreen onCompletion={() => setLoadingFinished(true)} />
      <Hero isVisible={loadingFinished} />
    </div>
  );
}
