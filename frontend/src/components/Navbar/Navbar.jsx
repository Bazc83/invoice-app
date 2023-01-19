import { DarkModeContext } from '@/App';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useLogout } from '@/hooks/useLogout';

import { useContext } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);

  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <img src='/images/logo.svg' alt='company logo' />
      </div>

      <div className={styles.navbarRightSide}>
        <div className={styles.authOptions}>
          {user && (
            <div>
              <FaSignOutAlt onClick={handleLogout} />
            </div>
          )}

          {!user && (
            <div className={styles.loginSignupWrapper}>
              <Link to='/login'>
                <FaSignInAlt />
              </Link>
              <Link to='/signup'>
                <FaUserEdit />
              </Link>
            </div>
          )}

          
        </div>
        <div onClick={toggleDarkMode} className={styles.darkModeToggle}>
          {theme === 'dark' ? (
            <img src='/images/icon-sun.svg' alt='sun icon' />
          ) : (
            <img src='/images/icon-moon.svg' alt='moon icon' />
          )}
        </div>
        <div className={styles.navbarBorderLine}></div>
        <div className={styles.navbarAvatar}>
          <img src='/images/image-avatar.jpg' alt='' />
        </div>
      </div>
    </nav>
  );
};
