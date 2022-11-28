import { Navbar } from '@/components/Navbar';
import styles from '@styles/PageLayout.module.css';
import { Outlet } from 'react-router-dom';
export const PageLayout = () => {
  return (
    <div className={styles.pageLayout}>
      <Navbar />

      <div className={styles.outletDiv}>
        <Outlet />
      </div>
    </div>
  );
};
