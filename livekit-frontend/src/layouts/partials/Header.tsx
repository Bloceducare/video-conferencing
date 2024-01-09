'use client';

import logo from '../../../public/logo.png';
import Logo from '@/layouts/components/Logo';
import ThemeSwitcher from '@/layouts/components/ThemeSwitcher';
import config from '@/config/config.json';
import menu from '@/config/menu.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import HomepageButton from '@/helpers/HomepageButton';

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  // destructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  // eslint-disable-next-line camelcase
  const { navigation_button, settings } = config;
  // get current path
  const pathname = usePathname();

  // scroll to top on route change
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <header className={`header ${settings.sticky_header && 'sticky top-0'}`}>
      <nav className="navbar container">
        {/* logo */}

        {/* <div className="order-0"> */}
        <Logo src={logo} />
        {/* </div> */}
        {/* /navbar toggler */}

        <div className="order-3 ml-auto flex items-center md:order-2 lg:ml-0">
          <ThemeSwitcher className="mr-5" />
          <span className=" hidden lg:inline-block">
            <HomepageButton />
          </span>

          <div className="drawer z-30 drawer-end lg:hidden">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}

                <li>
                  <HomepageButton />
                </li>
              </ul>
            </div>
          </div>
          {/* <div class="dropdown lg:hidden">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
   */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
