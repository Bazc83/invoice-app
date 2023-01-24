import { Navbar } from '@/components/Navbar';
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './PageLayout.module.css';

export const PageLayoutContext = createContext();

export const PageLayout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    if (!showModal) return;
    setShowModal(false);
  };



  return (
    <PageLayoutContext.Provider value={{ showModal, setShowModal }}>
      <div className={styles.pageLayout} onClick={handleCloseModal}>
        <Navbar />
        <div className={styles.outletDiv}>
          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
};
