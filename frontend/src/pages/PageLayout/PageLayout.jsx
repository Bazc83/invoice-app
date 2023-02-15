import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Navbar } from '@/components/Navbar';
import useModalStore from '@/context/useModalStore';

import 'react-toastify/dist/ReactToastify.css';

export function PageLayout({ theme }) {
  const filterModal = useModalStore((state) => state.filterModal);
  const mobileMenu = useModalStore((state) => state.mobileMenu);

  const hideAllModals = useModalStore((state) => state.hideAllModals);

  const handleCloseModal = () => {
    if (filterModal || mobileMenu) {
      hideAllModals();
    }
  };

  return (
    <div
      className="primary-bg relative flex h-max min-h-screen flex-col lg:grid lg:grid-cols-[100px_10fr] "
      onClick={handleCloseModal}
      aria-hidden="true"
    >
      <Navbar />

      {/* Show overlay when showFilterModal is true */}
      <div
        className={`lg:col-start-2 ${
          (filterModal || mobileMenu) &&
          'before:absolute before:z-10 before:h-[calc(100%-100px)] before:lg:h-full before:w-full before:lg:w-[calc(100%-100px)] before:bg-black before:opacity-70'
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
  );
}

export default PageLayout;
