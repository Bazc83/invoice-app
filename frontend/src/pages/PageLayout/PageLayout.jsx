import { Navbar } from '@/components/Navbar';
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayoutContext = createContext();

export const PageLayout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    if (!showModal) return;
    setShowModal(false);
  };

  return (
    <PageLayoutContext.Provider value={{ showModal, setShowModal }}>
      <div
        className='flex flex-col min-h-screen h-max primary-bg relative lg:grid lg:grid-cols-[72px_1fr]'
        onClick={handleCloseModal}>
        <Navbar />
        <div className='lg:col-start-2'>
          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
};
