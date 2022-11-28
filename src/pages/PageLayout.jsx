import { DarkModeContext } from '@/App';
import { Navbar } from '@/components/Navbar';
import styles from '@styles/PageLayout.module.css';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
export const PageLayout = () => {
  const { light } = useContext(DarkModeContext);

  return (
    <div className={`${light ? styles.pageLayouLight : styles.pageLayout}`}>
      <Navbar />
      <div className={styles.outletDiv}>
        <Outlet />
      </div>
    </div>
  );
};
