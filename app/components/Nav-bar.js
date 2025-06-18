"use client";

import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = (props) => {
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
    <nav className="bg-gray-800">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex flex-row justify-center gap-4 py-3">
          <Link href="/">
            <HomeIcon className="size-6 text-blue-400 hover:text-blue-300 mt-2" />
          </Link>
          {props.navLinks.map((navLink) => {
            return (
              <Link
                key={navLink.id}
                href={navLink.url}
                className={
                  pathname === navLink.url ? activePathClass : inactivePathClass
                }
              >
                {navLink.linkText}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          {props.navLinks.map((navLink) => {
            return (
              <Link
                key={navLink.id}
                href={navLink.url}
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
  );
};

export default NavBar;
