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
      <body>
        <div id="page">
          <BrandStrip />
          <NavBar
            loggersUrl="/ct/home"
            chartsUrl="/ct/charts"
            configUrl="/ct/config"
            calibrationUrl="/ct/calibration"
            reportsUrl="/ct/reports"
            groupsUrl="/ct/groups"
            licensesUrl="/ct/licenses"
            helpUrl="/ct/help"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
