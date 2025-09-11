import { Orbitron } from "next/font/google";
import localFont from "next/font/local";

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

export const nostromoLight = localFont({
  src: "../public/fonts/nostromo/Nostromo_Light.otf",
  weight: "300",
  style: "normal",
  variable: "--font-nostromo-light",
});

export const nostromoMedium = localFont({
  src: "../public/fonts/nostromo/Nostromo_Regular.otf",
  weight: "500",
  style: "normal",
  variable: "--font-nostromo-medium",
});

export const ruigslay = localFont({
  src: "../public/fonts/ruigslay/Ruigslay_Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-ruigslay",
});