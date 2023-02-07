import { FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import useModalStore from '@/context/useModalStore';


// List item component
function MobileNavListItem({ children }) {
  return (
    <li className="px-6 py-4 text-gray-900 hover:text-gray-600 dark:text-white hover:dark:text-gray-400">
      {children}
    </li>
  );
}



// MobileNavMenu component
function MobileNavMenu({ user, handleLogout }) {
  const mobileMenu = useModalStore((s) => s.mobileMenu);
  return (
    <ul
      className={` secondary-bg absolute top-0 right-0  z-40 flex w-max max-w-full flex-col flex-wrap gap-2 overflow-hidden rounded-b-md shadow-md transition-transform ease-in  last:pb-2 lg:hidden ${
        mobileMenu ? ' translate-y-20' : '-translate-y-[200px] '
      }`}
    >
      <MobileNavListItem>
        <Link to="/invoices"> Invoices</Link>
      </MobileNavListItem>

      {/* Logout */}
      {user && (
        <MobileNavListItem>
          <button
            className="flex items-center gap-2  "
            type="button"
            onClick={handleLogout}
          >
            Sign out
            <FaSignOutAlt className="text-xl " />
          </button>
        </MobileNavListItem>
      )}

      {/* Login */}
      {!user && (
        <MobileNavListItem>
          <Link to="/login" className="flex items-center gap-2 ">
            Login
            <FaSignInAlt className="text-xl " />
          </Link>
        </MobileNavListItem>
      )}

      {/* Register / signup */}
      {!user && (
        <MobileNavListItem>
          <Link to="/signup" className="flex items-center gap-2 ">
            Sign up
            <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
          </Link>
        </MobileNavListItem>
      )}
    </ul>
  );
}
export default MobileNavMenu;
