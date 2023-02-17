import { useContext } from 'react';
import {
  FaBars,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUserEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { DarkModeContext } from '@/App';
import { AuthContext } from '@/context/AuthContext';
import useModalStore from '@/context/useModalStore';
import { useLogout } from '@/hooks/useLogout';

import { RandomLogo } from './RandomLogo';

export function Navbar() {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const toggleMobileMenu = useModalStore((s) => s.toggleMobileMenu);
  const mobileMenu = useModalStore((s) => s.mobileMenu);

  const { user } = useContext(AuthContext);

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const handleToggleMobileMenu = (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  };

  return (
    <div className="noPrint | z-50 h-20 bg-gray-900">
      {/* Navbar Container */}
      <div className=" relative mx-auto flex h-20 max-w-6xl items-center justify-between py-4 px-6 text-gray-50">
        {/* Random logo */}
        <RandomLogo />

        <div className=" relative  flex items-center justify-center gap-4">
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} type="button">
            {theme === 'dark' ? (
              <FaSun className="text-xl transition-colors hover:text-gray-400" />
            ) : (
              <FaMoon className="text-xl transition-colors hover:text-gray-400" />
            )}
          </button>

          {/* Hamburger menu button */}
          <button type="button" onClick={handleToggleMobileMenu}>
            <FaBars className="text-3xl" />
          </button>

          {/* Navlist */}
          {mobileMenu && (
            <nav
              className={`secondary-bg absolute top-14 right-0 z-30 overflow-hidden rounded-md shadow-md transition-transform ease-in `}
            >
              <ul className="flex w-max max-w-full flex-col flex-wrap gap-3   divide-y-2 divide-gray-900 divide-opacity-10 last:pb-4  dark:divide-gray-50 dark:divide-opacity-10">
                <li className="px-6 pt-6 pb-4 text-base text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-gray-400">
                  <Link to="/invoices"> Invoices</Link>
                </li>

                {/* Logout */}
                {user && (
                  <li className="px-6 py-4 text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-gray-400">
                    <button
                      className="flex items-center gap-2 text-base "
                      type="button"
                      onClick={handleLogout}
                    >
                      Sign out
                      <FaSignOutAlt className="text-xl " />
                    </button>
                  </li>
                )}

                {/* Login */}
                {!user && (
                  <li className="px-6 py-4 text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-gray-400">
                    <Link to="/login" className="flex items-center gap-2 ">
                      Login
                      <FaSignInAlt className="text-xl " />
                    </Link>
                  </li>
                )}

                {/* Register / signup */}
                {!user && (
                  <li className="px-6 py-4 text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-gray-400">
                    <Link to="/signup" className="flex items-center gap-2 ">
                      Sign up
                      <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
