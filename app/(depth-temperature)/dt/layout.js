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

const navLinks = [
  {
    id: 1,
    url: "/dt/home",
    linkText: "Loggers",
  },
  {
    id: 2,
    url: "/dt/charts",
    linkText: "charts",
  },
  {
    id: 3,
    url: "/dt/config",
    linkText: "Configuration",
  },
  {
    id: 4,
    url: "/dt/calibration",
    linkText: "Calibration",
  },
  {
    id: 5,
    url: "/dt/reports",
    linkText: "Reports",
  },
  {
    id: 6,
    url: "/dt/licenses",
    linkText: "Licenses",
  },
  {
    id: 7,
    url: "/dt/help",
    linkText: "Help",
  },
];

export default function DtLayout({ children }) {
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
