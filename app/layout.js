import "./globals.css";

export const metadata = {
  title: "VinHack 25",
  description: "Coming Soon...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
