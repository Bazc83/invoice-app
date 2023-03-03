import { FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import NavLinkItem from './NavLinkItem';

function MobileNav({ user, handleLogout }) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-16 right-5 z-30 overflow-hidden rounded-b-md bg-skin-main-bg px-6 py-6  text-skin-base transition-transform ease-in md:hidden">
      <ul className="flex  w-max  flex-col  gap-4 items-start justify-start ">
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

        {/* Logout */}

        {user && (
          <NavLinkItem>
            <button
              className="flex w-full items-center gap-2 py-2 text-skin-base "
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

        {/* Button shows new invoice form */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-skin-success  px-4 py-2 text-sm text-white   transition-colors duration-300 hover:bg-skin-success-darker md:w-auto"
          onClick={() => navigate('/newinvoice')}
        >
          Add Invoice
        </button>
      </ul>
    </div>
  );
}
export default MobileNav;
