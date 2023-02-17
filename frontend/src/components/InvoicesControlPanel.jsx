import { useNavigate } from 'react-router';

import Filters from './Filters';

function InvoicesControlPanel({ state }) {
  const navigate = useNavigate();
  return (
    <div className="md:bg-gray-50 md:dark:bg-gray-900 flex flex-col items-center  justify-between gap-6 rounded-md  p-6 md:flex-row lg:flex-col lg:justify-start lg:pt-8 h-max">
      
      {/* Button shows new invoice form */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-green-900 px-4 py-2  text-gray-50 md:w-auto  hover:bg-opacity-90"
        onClick={() => navigate('/newinvoice')}
      >
        Add Invoice
      </button>

      {/* <Filters /> */}
      <Filters state={state} />
    </div>
  );
}
export default InvoicesControlPanel;
