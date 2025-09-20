import "./globals.css";
import {
  orbitron,
  nostromoLight,
  nostromoMedium,
  ruigslay,
  gulimche,
} from "./fonts";
import AuthProvider from "./components/AuthProvider";
import CustomCursor from "./components/CustomCursor";


export const metadata = {
  title: "VinHack 25",
  description: "VinHack is a 36-hour hybrid hackathon where teams build innovative solutions to real-world challenges. With coding rounds, guest talks, and fun activities, participants learn, collaborate, and compete for exciting prizes.",
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
          <CustomCursor/>
        </AuthProvider>
      </body>
    </html>
  );
}