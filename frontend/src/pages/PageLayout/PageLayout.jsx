import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/Navbar';

export const PageLayoutContext = createContext();

export function PageLayout() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    if (!showModal) return;
    setShowModal(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PageLayoutContext.Provider value={{ showModal, setShowModal }}>
      <div
        className="primary-bg relative flex h-max min-h-screen flex-col lg:grid lg:grid-cols-[80px_1fr]"
        onClick={handleCloseModal}
        aria-hidden="true"
      >
        <Navbar />

        {/* Show overlay when showModal is true */}
        <div
          className={`lg:col-start-2 ${
            showModal &&
            'before:absolute before:z-10 before:h-full before:w-full before:bg-black before:opacity-50'
          } `}
        >
          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;
