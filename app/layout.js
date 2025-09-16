import "./globals.css";
import {
  orbitron,
  nostromoLight,
  nostromoMedium,
  ruigslay,
  gulimche,
} from "./fonts";

export const metadata = {
  title: "VinHack 25",
  description: "Coming Soon...",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`overflow-x-hidden ${orbitron.variable} ${nostromoLight.variable} ${nostromoMedium.variable} ${ruigslay.variable} ${gulimche.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}