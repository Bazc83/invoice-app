import { useNavigate } from 'react-router';

import InvoiceFilters from './InvoiceFilters';

function FilterModalAndAddNewInvoice({ state }) {
  const navigate = useNavigate();
  return (
    <div className="secondary-bg flex flex-col  items-center justify-between gap-6  rounded-md p-6 ">
      {/* Button shows new invoice form */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-green-900 px-4 py-2 text-sm text-gray-50 md:w-auto lg:text-base"
        onClick={() => navigate('/newinvoice')}
      >
        Add Invoice
      </button>
      {/* <Filters /> */}
      <InvoiceFilters state={state} />
    </div>
  );
}
export default FilterModalAndAddNewInvoice;
