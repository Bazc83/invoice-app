import { useNavigate } from 'react-router';

import Filters from './Filters';

function InvoicesControlPanel({ state }) {
  const navigate = useNavigate();
  return (
    <div className="  flex h-max flex-col items-center  justify-between gap-6 rounded-md   bg-skin-secondary px-6 py-6 text-sm  text-skin-base shadow-md md:flex-row ">
      {/* Button shows new invoice form */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-skin-success px-4 py-2  text-sm text-white hover:bg-opacity-90 md:w-auto"
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
