import { Geist, Geist_Mono } from "next/font/google";
import BrandStrip from "../../components/Brand-strip";
import NavBar from "../../components/Nav-bar";
import "../../(home-panel)/globals.css";

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

export default function ParLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-600">
        <div id="page">
          <BrandStrip />
          <NavBar
            loggersUrl="/wl/home"
            chartsUrl="/wl/charts"
            configUrl="/wl/config"
            calibrationUrl="/wl/calibration"
            reportsUrl="/wl/reports"
            groupsUrl="/wl/groups"
            licensesUrl="/wl/licenses"
            helpUrl="/wl/help"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
