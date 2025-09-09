import "./globals.css";
import localFont from "next/font/local";

const ruigslay = localFont({
  src: "../public/fonts/ruigslay/Ruigslay_Regular.ttf",
  weight: "400",
  style: "normal",
});

const nostromo = localFont({
  src: [
    {
      path: "../public/fonts/nostromo/Nostromo_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nostromo/Nostromo_Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-nostromo",
});


export const metadata = {
  title: "VinHack 25",
  description: "Coming Soon...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nostromo.className}>{children}</body>
    </html>
  );
}