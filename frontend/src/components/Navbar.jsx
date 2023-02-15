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

import MobileNavMenu from './MobileNavMenu';
import { RandomLogo } from './RandomLogo';

export function Navbar() {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const toggleMobileMenu = useModalStore((s) => s.toggleMobileMenu);

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
    <div className="grid grid-cols-1 grid-rows-1">
      {/*  */}
      {/* Mobile Menu */}
      {/*  */}
      <div className="relative col-span-full row-span-full">
        <MobileNavMenu user={user} handleLogout={handleLogout} />
      </div>

      <nav className="z-50 col-span-full row-span-full flex h-20 items-center justify-between bg-gray-900 py-4 px-10 text-gray-50 lg:fixed lg:h-screen lg:w-[100px] lg:flex-col lg:px-0 ">
        <div className="flex  w-full items-center justify-between gap-4  lg:w-auto  lg:flex-col lg:gap-12 ">
          <div className="flex items-center gap-2 ">
            {/* Random logo */}
            <RandomLogo />
          </div>

          {/* Nav list */}
          <ul
            className={` hidden flex-col gap-2 lg:static lg:flex lg:w-auto lg:items-center  lg:justify-center lg:bg-transparent`}
          >
            <li>
              <Link to="/invoices"> Invoices</Link>
            </li>
          </ul>
        </div>

        <div className="flex lg:flex-col items-center justify-center gap-4">
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} type="button">
            {theme === 'dark' ? (
              <FaSun className="text-xl transition-colors hover:text-gray-400" />
            ) : (
              <FaMoon className="text-xl transition-colors hover:text-gray-400" />
            )}
          </button>

          <ul>
            <div className=" flex flex-col gap-3">
              {/* Logout */}
              {user && (
                <li>
                  <button
                    className="hidden items-center gap-2 lg:flex"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                    <FaSignOutAlt className="text-xl transition-colors hover:text-gray-400" />
                  </button>
                </li>
              )}

              {/* Login */}
              {!user && (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    Login
                    <FaSignInAlt className="text-xl transition-colors hover:text-gray-400" />
                  </Link>
                </li>
              )}
              {/* Register / signup */}
              {!user && (
                <li>
                  <Link to="/signup" className="flex items-center gap-2">
                    Sign up
                    <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
                  </Link>
                </li>
              )}
            </div>
          </ul>
          <button type="button" onClick={handleToggleMobileMenu}>
            <FaBars className="text-3xl lg:hidden" />
          </button>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
