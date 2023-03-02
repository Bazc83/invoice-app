import { FaChevronRight, FaRegWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import Filters from './Filters';

function InvoicesControlPanel({ state, setShowOptions, showOptions }) {
  const navigate = useNavigate();

  return (
    <div
      className={` ${
        showOptions
          ? 'left-4 translate-x-0'
          : 'left-0 -translate-x-[calc(100%_+_1.5rem)]'
      } absolute  -top-16 z-[100]  flex h-max w-[calc(100%-2rem)]  flex-col  items-center justify-between gap-6 rounded-md  bg-skin-secondary  px-6 py-6 text-sm text-skin-base transition-transform duration-700 md:static md:w-auto md:translate-x-0
     md:flex-row lg:w-[200px]  lg:flex-col-reverse lg:items-center lg:gap-8`}
    >
      <button
        type="button"
        onClick={() => setShowOptions((prev) => !prev)}
        className={` ${
          showOptions ? 'right-0' : '-right-12'
        } group absolute  top-0 z-20  block rounded-r-md bg-skin-secondary py-2 pr-2 pl-4 text-2xl transition-all duration-300 md:hidden`}
      >
        {showOptions ? (
          <span className="absolute -top-10 right-0 hidden w-[120px] rounded-md  bg-gray-600 px-1 py-1 text-sm group-hover:inline-block text-white">
            Close
          </span>
        ) : (
          <span className="absolute -top-5 -right-32 hidden w-[120px] rounded-md  bg-gray-600 px-1 py-1 text-sm group-hover:inline-block text-white ">
            Show Options
          </span>
        )}

        {showOptions ? <FaRegWindowClose /> : <FaChevronRight />}
      </button>
      {/* <Filters /> */}
      <Filters state={state} />

      {/* Button shows new invoice form */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-skin-success  px-4 py-2 text-sm text-white   transition-colors duration-300 hover:bg-skin-success-darker md:w-auto"
        onClick={() => navigate('/newinvoice')}
      >
        Add Invoice
      </button>
    </div>
  );
}
export default InvoicesControlPanel;
