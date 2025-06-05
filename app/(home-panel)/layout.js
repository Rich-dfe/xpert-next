import { Geist, Geist_Mono } from "next/font/google";
import BrandStrip from "../components/Brand-strip";
import NavBar from "../components/Nav-bar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Xpert",
  description: "Dataflow Xpert System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-300">
        <BrandStrip />
        {children}
      </body>
    </html>
  );
}
