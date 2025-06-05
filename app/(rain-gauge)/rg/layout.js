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

export default function RgLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <BrandStrip />
          <NavBar
            loggersUrl="/dt/home"
            chartsUrl="/dt/charts"
            configUrl="/dt/config"
            calibrationUrl="/dt/calibration"
            reportsUrl="/dt/reports"
            groupsUrl="/dt/groups"
            licensesUrl="/dt/licenses"
            helpUrl="/dt/help"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
