import { Navbar } from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import styles from './PageLayout.module.css';
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
