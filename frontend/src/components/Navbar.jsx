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
    <div className="noPrint | z-50 h-20 bg-gray-800">
      {/* Navbar Container */}
      <div className=" relative mx-auto flex h-20 max-w-6xl items-center justify-between py-4 px-4 text-gray-50 md:px-6 xl:px-0">
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
              className={`secondary-bg absolute top-14 right-0 z-30 overflow-hidden shadow-md transition-transform ease-in `}
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
                      className="flex w-full items-center gap-2 py-2 text-base  "
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
                    <Link to="/signup" className="flex items-center gap-2 py-2 ">
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
