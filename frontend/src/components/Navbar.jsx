import { useContext, useEffect } from 'react';
import {
  FaBars,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUserEdit,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { DarkModeContext } from '@/App';
import { AuthContext } from '@/context/AuthContext';
import useModalStore from '@/context/useModalStore';
import { useLogout } from '@/hooks/useLogout';
import useWindowResize from '@/hooks/useWindowResize';

import MobileNav from './MobileNav';
import NavLinkItem from './NavLinkItem';

export function Navbar() {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const toggleMobileMenu = useModalStore((s) => s.toggleMobileMenu);
  const mobileMenu = useModalStore((s) => s.mobileMenu);
  const hideMobileMenu = useModalStore((s) => s.hideMobileMenu);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const handleToggleMobileMenu = (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  };

  const { windowResizing } = useWindowResize();

  useEffect(() => {
    hideMobileMenu();
  }, [windowResizing, hideMobileMenu]);

  return (
    <div className="noPrint | z-30 bg-skin-main-bg  ">
      {/* Navbar Container */}
      <nav className=" relative mx-auto flex  max-w-5xl   grid-cols-[150px_1fr] items-center justify-between py-4 px-4 md:grid  md:px-6 ">
        <Link to="/" aria-label="Home">
          <h1 className=" text-2xl font-semibold ">LOGO</h1>
        </Link>

        <div className=" justify-betweengap-4 flex ">
          <ul className="hidden  w-full  items-center justify-center  gap-4 font-semibold md:flex">
            {/* User Profile */}
            {user && (
              <NavLinkItem>
                <Link to="profile" className="block py-2 ">
                  Profile
                </Link>
              </NavLinkItem>
            )}

            {/* Invoices link */}
            {user && (
              <NavLinkItem>
                <Link to="/invoices" className="block py-2 ">
                  {' '}
                  Invoices
                </Link>
              </NavLinkItem>
            )}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            {/* Button shows new invoice form */}

            {user && (
              <button
                type="button"
                className="btn | hover:border-skin-success-darker min-w-max  rounded-md border  border-skin-success bg-skin-success px-2 py-1   text-sm text-white hover:bg-skin-success-darker"
                onClick={() => navigate('/newinvoice')}
              >
                Add Invoice
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              type="button"
              className="btn flex min-w-max  text-xl text-skin-muted  hover:text-skin-base "
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            {/* Logout */}

            {user && (
              <button
                className="btn | hover flex  min-w-max items-center justify-center gap-2  rounded-full py-2  text-sm text-skin-muted hover:text-skin-base "
                type="button"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-lg " />
              </button>
            )}

            {/* Login */}
            {!user && (
              <button
                type="button"
                className="btn | hover flex  min-w-max items-center justify-center gap-2  rounded-full py-2  text-sm text-skin-muted hover:text-skin-base"
                onClick={() => navigate('/login')}
              >
                Login
                <FaSignInAlt className="text-xl " />
              </button>
            )}

            {/* Register / signup */}
            {!user && (
              <button
                type="button"
                className="btn | hover flex  min-w-max items-center justify-center gap-2  rounded-full py-2  text-sm text-skin-muted hover:text-skin-base"
                onClick={() => navigate('/login')}
              >
                Sign up
                <FaUserEdit className="text-xl " />
              </button>
            )}
          </div>

          {/* Hamburger menu button */}
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="block text-3xl text-skin-muted transition-all duration-300 hover:text-skin-base md:hidden"
          >
            <FaBars />
          </button>

          {/* Navlist */}
          {mobileMenu && <MobileNav user={user} handleLogout={handleLogout} />}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
