import { FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import useModalStore from '@/context/useModalStore';

function MobileNavMenu({ user, handleLogout }) {
  const mobileMenu = useModalStore((s) => s.mobileMenu);
  return (
    
      <ul
        className={` secondary-bg absolute top-0 right-0  z-40 flex w-max  flex-col gap-2 overflow-hidden rounded-b-md shadow-md transition-transform ease-in  lg:hidden ${
          mobileMenu ? ' translate-y-20' : '-translate-y-[200px] '
        }`}
      >
        <li className="px-6 py-4 ">
          <Link to="/invoices"> Invoices</Link>
        </li>

        {/* Logout */}
        {user && (
          <li>
            <button
              className="flex items-center gap-2  px-6 py-4"
              type="button"
              onClick={handleLogout}
            >
              Sign out
              <FaSignOutAlt className="text-xl transition-colors hover:text-gray-400" />
            </button>
          </li>
        )}

        {/* Login */}
        {!user && (
          <li>
            <Link to="/login" className="flex items-center gap-2 px-6 py-4">
              Login
              <FaSignInAlt className="text-xl transition-colors hover:text-gray-400" />
            </Link>
          </li>
        )}

        {/* Register / signup */}
        {!user && (
          <li>
            <Link to="/signup" className="flex items-center gap-2 px-6 py-4">
              Sign up
              <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
            </Link>
          </li>
        )}
      </ul>
   
  );
}
export default MobileNavMenu;
