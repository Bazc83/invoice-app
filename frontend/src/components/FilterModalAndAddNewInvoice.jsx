import { useNavigate } from 'react-router';

import { FilterModal } from '@/components/FilterModal';
import ShowFiltersAndClear from '@/pages/Invoices/ShowFiltersAndClear';

function FilterModalAndAddNewInvoice({ state }) {
  const navigate = useNavigate();
  return (
    <div className="secondary-bg flex items-center justify-between gap-4 rounded-md px-4 py-4">
      {/* Shows current filters and a button to clear all filters */}
      {state.checkedFilters?.length > 0 && <ShowFiltersAndClear />}

      <div className="flex w-full flex-col md:flex-row items-center  justify-center gap-4 sm:ml-auto md:w-auto ">
        {/* FilterModal invoices compontent */}
        <FilterModal />

        {/* Button shows new invoice form */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-green-900 px-4 py-2 text-sm text-gray-50 md:w-auto lg:text-base"
          onClick={() => navigate('/newinvoice')}
        >
          Add Invoice
        </button>
      </div>
    </div>
  );
}
export default FilterModalAndAddNewInvoice;
