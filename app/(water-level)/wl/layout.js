import { Geist, Geist_Mono } from "next/font/google";
import BrandStrip from "../../components/Brand-strip";
import NavBar from "../../components/Nav-bar";
import Zappy from "@/app/components/zappy";
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

const navLinks = [
  {
    id: 1,
    url: "/wl/home",
    linkText: "Loggers",
  },
  {
    id: 2,
    url: "/wl/charts",
    linkText: "Charts",
  },
  {
    id: 4,
    url: "/wl/calibration",
    linkText: "Calibration",
  },
  {
    id: 5,
    url: "/wl/reports",
    linkText: "Reports",
  },
  {
    id: 8,
    url: "/wl/groups",
    linkText: "Groups",
  },
  {
    id: 6,
    url: "/wl/licenses",
    linkText: "Licenses",
  },
  {
    id: 7,
    url: "/wl/help",
    linkText: "Help",
  },
];

export default function WlLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-600">
        <div id="page">
          <BrandStrip />
          <NavBar navLinks={navLinks} />
          {children}
        </div>
      </body>
    </html>
  );
}
