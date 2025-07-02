import { Geist, Geist_Mono } from "next/font/google";
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

const productType = "Water Level";

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
    id: 3,
    url: "/wl/calibration",
    linkText: "Calibration",
  },
  {
    id: 4,
    url: "/wl/reports",
    linkText: "Reports",
  },
  {
    id: 5,
    url: "/wl/groups",
    linkText: "Groups",
  },  
  {
    id: 8,
    url: "/",
    linkText: "Home",
  },
];

export default function WlLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-600">
        <div id="page">
          <NavBar navLinks={navLinks} productType={productType}/>
          {children}
        </div>
      </body>
    </html>
  );
}
