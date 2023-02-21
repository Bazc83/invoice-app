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
      className="primary-bg print relative flex h-max min-h-screen flex-col  "
      onClick={handleCloseModal}
      aria-hidden="true"
    >
      <Navbar />

      {/* Show overlay when showFilterModal is true */}
      <div
        className={` lg:col-start-2  ${
          (filterModal || mobileMenu) &&
          ' blur-[0.5px] before:absolute before:z-30 before:h-full before:min-h-[calc(100vh-5rem)]  before:w-full before:bg-black/30 before:dark:bg-black/50 '
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
