import { DarkModeContext } from '@/App';
import { useContext } from 'react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { theme, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLogo}>
        <img src='/images/logo.svg' alt='company logo' />
      </div>

      <div className={styles.navbarRightSide}>
        <div onClick={toggleDarkMode} className={styles.darkModeToggle}>
          {theme === 'dark' ? (
            <img src='/images/icon-sun.svg' />
          ) : (
            <img src='/images/icon-moon.svg' />
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
