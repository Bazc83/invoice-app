import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/Navbar';

export const PageLayoutContext = createContext();

export function PageLayout() {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleCloseModal = () => {
    if (!showFilterModal) return;
    setShowFilterModal(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PageLayoutContext.Provider value={{ showFilterModal, setShowFilterModal }}>
      <div
        className="primary-bg relative flex h-max min-h-screen flex-col lg:grid lg:grid-cols-[80px_1fr] "
        onClick={handleCloseModal}
        aria-hidden="true"
      >
        <Navbar />

        {/* Show overlay when showFilterModal is true */}
        <div
          className={`lg:col-start-2 ${
            showFilterModal &&
            'before:absolute before:z-10 before:h-full before:w-full before:bg-black before:opacity-70'
          } `}
        >
          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;
