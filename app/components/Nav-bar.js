"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/xpert-logo.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();
  const activePathClass =
    "rounded-md bg-green-400 px-3 py-2 text-sm font-medium text-black";
  const inactivePathClass =
    "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-green-900 hover:text-white";

  const mobileActivePathClass =
    "block rounded-md bg-green-400 px-3 py-2 text-base font-medium text-black";
  const mobileInactivePathClass =
    "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <>
      <div className="flex pl-4 sm:justify-center bg-gray-800 pd items-center gap-1">
        <Image className="h-8 w-auto" src={logoImg} alt="Your Company" />
        <div className=" flex flex-col mr-auto sm:mx-0 text-3xl p-2 text-gray-300">
          Dataflow Xpert
          <div className="text-xs pl-1">{props.productType}</div>
        </div>

        <div className="pr-3">
          <Bars3Icon
            onClick={toggleMobileMenu}
            className="size-6 text-blue-300 sm:hidden"
          />
        </div>
      </div>
      <nav className="bg-gray-800">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex flex-row justify-center gap-4 py-3">
            {props.navLinks.map((navLink) => {
              return (
                <Link
                  key={navLink.id}
                  href={navLink.url}
                  className={
                    pathname === navLink.url
                      ? activePathClass
                      : inactivePathClass
                  }
                >
                  {navLink.linkText}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div
          className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            {props.navLinks.map((navLink) => {
              return (
                <Link
                  key={navLink.id}
                  href={navLink.url}
                  onClick={toggleMobileMenu}
                  className={
                    pathname === navLink.url
                      ? mobileActivePathClass
                      : mobileInactivePathClass
                  }
                >
                  {navLink.linkText}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
