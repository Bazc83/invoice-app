import { DarkModeContext } from "@/App";
import { AuthContext } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";
import { useContext } from "react";
import {
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaUserEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { RandomLogo } from "../RandomLogo";


export const Navbar = () => {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const { user } = useContext(AuthContext);

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex h-20 items-center justify-between bg-gray-900 p-4 text-gray-50 lg:fixed lg:h-screen lg:w-20 lg:flex-col">
      {/* Random logo */}
      <RandomLogo />

      <div className="flex items-center justify-center gap-4 px-6 lg:flex-col lg:gap-4 lg:p-0 lg:pb-6">
        {/* Dark mode toggle */}
        <div onClick={toggleDarkMode} >
          {theme === "dark" ? (
            <FaSun className="text-xl transition-colors hover:text-gray-400" />
          ) : (
            <FaMoon className="text-xl transition-colors hover:text-gray-400" />
          )}
        </div>

        {/* Logout */}
        {user && (
          <FaSignOutAlt
            onClick={handleLogout}
            className="text-xl transition-colors hover:text-gray-400"
          />
        )}

        {/* Login */}
        {!user && (
          <Link to="/login">
            <FaSignInAlt className="text-xl transition-colors hover:text-gray-400" />
          </Link>
        )}

        {/* Register / signup */}
        {!user && (
          <Link to="/signup">
            <FaUserEdit className="text-xl transition-colors hover:text-gray-400" />
          </Link>
        )}
      </div>
    </nav>
  );
};
