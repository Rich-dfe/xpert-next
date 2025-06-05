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
            loggersUrl="/sm/home"
            chartsUrl="/sm/charts"
            configUrl="/sm/config"
            calibrationUrl="/sm/calibration"
            reportsUrl="/sm/reports"
            groupsUrl="/sm/groups"
            licensesUrl="/sm/licenses"
            helpUrl="/sm/help"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
