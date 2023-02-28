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

import NavLinkItem from './NavLinkItem';
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
    <div className="noPrint | z-30 bg-skin-navbar text-white">
      {/* Navbar Container */}
      <div className=" relative mx-auto flex  max-w-6xl items-center justify-between py-4 px-4  md:px-6 xl:px-0">
        <Link to="/">
          {/* Random logo */}
          <RandomLogo />
        </Link>

        <div className=" relative  flex items-center justify-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            type="button"
            className="transition-all duration-300 hover:scale-95 hover:text-gray-200"
          >
            {theme === 'dark' ? (
              <FaSun className="text-xl transition-colors hover:opacity-90" />
            ) : (
              <FaMoon className="text-xl transition-colors hover:opacity-90" />
            )}
          </button>

          {/* Hamburger menu button */}
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="transition-all duration-300 hover:scale-95 hover:text-gray-200"
          >
            <FaBars className="text-3xl " />
          </button>

          {/* Navlist */}
          {mobileMenu && (
            <nav
              className={`absolute top-14 right-0 z-30 overflow-hidden rounded-b-md bg-skin-secondary text-skin-base shadow-md transition-transform ease-in `}
            >
              <ul className="flex  w-[250px]  flex-col  ">
                {/* User Profile */}

                {user && (
                  <NavLinkItem>
                    <Link to="profile" className="block py-2">
                      Profile
                    </Link>
                  </NavLinkItem>
                )}

                {/* Invoices link */}
                {user && (
                  <NavLinkItem>
                    <Link to="/invoices" className="block py-2">
                      {' '}
                      Invoices
                    </Link>
                  </NavLinkItem>
                )}

                {/* Logout */}

                {user && (
                  <NavLinkItem>
                    <button
                      className="flex w-full items-center gap-2 py-2 text-skin-base  "
                      type="button"
                      onClick={handleLogout}
                    >
                      Sign out
                      <FaSignOutAlt className="text-xl " />
                    </button>
                  </NavLinkItem>
                )}

                {/* Login */}
                {!user && (
                  <NavLinkItem>
                    <Link to="/login" className="flex items-center gap-2 py-2">
                      Login
                      <FaSignInAlt className="text-xl " />
                    </Link>
                  </NavLinkItem>
                )}

                {/* Register / signup */}
                {!user && (
                  <NavLinkItem>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 py-2 "
                    >
                      Sign up
                      <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
                    </Link>
                  </NavLinkItem>
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
