import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Navbar } from '@/components/Navbar';

import 'react-toastify/dist/ReactToastify.css';

export const PageLayoutContext = createContext();

export function PageLayout({ theme }) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);

  const handleCloseModal = () => {
    if (!showFilterModal) return;
    setShowFilterModal(false);
  };

  return (
    <PageLayoutContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        showFilterModal,
        setShowFilterModal,
        showNewInvoiceForm,
        setShowNewInvoiceForm,
      }}
    >
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
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme={theme}
          />
          <Outlet />
        </div>
      </div>
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;
