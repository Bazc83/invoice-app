import { useNavigate } from 'react-router';

import Filters from './Filters';

function InvoicesControlPanel({ state }) {
  const navigate = useNavigate();

  return (
    <div
      className={`  flex h-max  flex-col  items-center justify-between gap-6 rounded-md  bg-skin-secondary  px-6 py-6 text-sm text-skin-base transition-transform duration-700 md:static md:w-auto md:translate-x-0
     md:flex-row lg:w-[200px]  lg:flex-col-reverse lg:items-center lg:gap-8`}
    >
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
