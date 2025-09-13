import "./globals.css";
import {
  orbitron,
  nostromoLight,
  nostromoMedium,
  ruigslay,
} from "./fonts";

export const metadata = {
  title: "VinHack 25",
  description: "Coming Soon...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} overflow-x-hidden ${nostromoLight.variable} ${nostromoMedium.variable} ${ruigslay.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

