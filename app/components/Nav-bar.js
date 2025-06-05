'use client'

import { HomeIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
import { usePathname } from 'next/navigation';

const NavBar = (props) => {
    const pathname = usePathname();
    const activePathClass = "rounded-md bg-green-400 px-3 py-2 text-sm font-medium text-black";
    const inactivePathClass = "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-green-900 hover:text-white";

    const mobileActivePathClass = "block rounded-md bg-green-400 px-3 py-2 text-base font-medium text-black";
    const mobileInactivePathClass = "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"

    return (
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="flex shrink-0 items-center">
                    <Link href="/"><HomeIcon className="size-6 text-blue-400 hover:text-blue-300" /></Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link
                      href={props.loggersUrl}
                      className={pathname === props.loggersUrl ? activePathClass : inactivePathClass}
                    >
                      Loggers
                    </Link>
                    <Link
                      href={props.chartsUrl}
                      className={pathname === props.chartsUrl ? activePathClass : inactivePathClass}
                    >
                      Charts
                    </Link>
                    <Link
                      href={props.configUrl}
                      className={pathname === props.configUrl ? activePathClass : inactivePathClass}
                    >
                      Configuration
                    </Link>
                    <Link
                      href={props.calibrationUrl}
                      className={pathname === props.calibrationUrl ? activePathClass : inactivePathClass}
                    >
                      Calibration
                    </Link>
                    <Link
                      href={props.reportsUrl}
                      className={pathname === props.reportsUrl ? activePathClass : inactivePathClass}
                    >
                      Reports
                    </Link>
                    <Link
                      href={props.groupsUrl}
                      className={pathname === props.groupsUrl ? activePathClass : inactivePathClass}
                    >
                      Groups
                    </Link>
                    <Link
                      href={props.licensesUrl}
                      className={pathname === props.licensesUrl ? activePathClass : inactivePathClass}
                    >
                      Licenses
                    </Link>
                    <Link
                      href={props.helpUrl}
                      className={pathname === props.helpUrl ? activePathClass : inactivePathClass}
                    >
                      Help
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state. */}
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Link
                      href={props.loggersUrl}
                      className={pathname === props.loggersUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Loggers
                    </Link>
                    <Link
                      href={props.chartsUrl}
                      className={pathname === props.chartsUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Charts
                    </Link>
                    <Link
                      href={props.configUrl}
                      className={pathname === props.configUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Configuration
                    </Link>
                    <Link
                      href={props.calibrationUrl}
                      className={pathname === props.calibrationUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Calibration
                    </Link>
                    <Link
                      href={props.reportsUrl}
                      className={pathname === props.reportsUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Reports
                    </Link>
                    <Link
                      href={props.groupsUrl}
                      className={pathname === props.groupsUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Groups
                    </Link>
                    <Link
                      href={props.licensesUrl}
                      className={pathname === props.licensesUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Licenses
                    </Link>
                    <Link
                      href={props.helpUrl}
                      className={pathname === props.helpUrl ? mobileActivePathClass : mobileInactivePathClass}
                    >
                      Help
                    </Link>
            </div>
          </div>
        </nav>
    );
};

export default NavBar;