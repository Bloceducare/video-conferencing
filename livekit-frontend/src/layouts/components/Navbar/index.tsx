import React, { useEffect, useState } from 'react';
import Logo from '@/layouts/components/Logo';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { useTheme } from 'next-themes';


const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const [darkmode, setDarkmode] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const [userString, setUserString] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      setUserString(user);
    }
  }, []);

  const user: {
    id: number | null;
    username: string | null;
    name: string | null;
    email: string | null;
    role: string | null;
  } = userString ? JSON.parse(userString) : {
    id: null,
    username: null,
    name: null,
    email: null,
    role: null,
  };
  
  React.useEffect(() => {
    setDarkmode(document.body.classList.contains('dark'));
  }, [darkmode]);
  return (
    <div className="navbar dark:bg-black bg-white">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end flex items-center justify-end">
          <div
            className="cursor-pointer text-gray-600 mr-3"
            onClick={() =>
              setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {theme === 'dark' ? (
              <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            )}
          </div>

          <div className="dark:text-white hidden lg:inline-block  ">{user ? user.username : ''}</div>
          <div tabIndex={0} role="button" className=" avatar hidden pl-6 lg:inline-block ">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          <div className="drawer drawer-end lg:hidden">
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
                <div className="flex items-center justify-end">
                  <div className="dark:text-white ">Hey, samson</div>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                </div>
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown dropdown-end"></div>
    </div>
  );
};

export default Navbar;
