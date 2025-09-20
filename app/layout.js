import "./globals.css";
import {
  orbitron,
  nostromoLight,
  nostromoMedium,
  ruigslay,
  gulimche,
} from "./fonts";
import AuthProvider from "./components/AuthProvider";


export const metadata = {
  title: "VinHack 25",
  description: "Coming Soon...",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png"
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={`overflow-x-hidden ${orbitron.variable} ${nostromoLight.variable} ${nostromoMedium.variable} ${ruigslay.variable} ${gulimche.variable} font-sans`}

      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}