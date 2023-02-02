import { useContext, useEffect } from 'react';

import { FilterModal } from '@/components/FilterModal';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

import { ShowFiltersAndClear } from './ShowFiltersAndClear';

export function Invoices() {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return 'Loading...';
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <div className="primary-bg relative flex  flex-col px-6 md:px-8">
      {/* Invoices page controls */}
      <div className="secondary-bg mt-6 mb-2 flex flex-wrap-reverse items-center justify-center gap-2 rounded-md p-6 shadow-md sm:justify-between lg:mb-2">
        {/* FilterModal invoices compontent */}
        <FilterModal />

        {/* Button shows new invoice form */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-green-900 px-4 py-2 text-sm text-gray-50 sm:w-auto lg:text-base"
          onClick={() => dispatch({ type: 'toggleInvoiceForm' })}
        >
          Add Invoice
        </button>
      </div>

      {/* Shows current filters and a button to clear all filters */}
      {state.checkedFilters?.length > 0 && <ShowFiltersAndClear />}

      {/* Add new invoice */}
      {state.showInvoiceForm && <NewInvoiceForm />}

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}

      {/* Invoice previews  */}
      <div className="flex flex-col gap-6 pb-6 pt-3 lg:gap-6 ">
        {/* invoice previews */}
        {invoices?.length > 0 &&
          state.filteredInvoices?.map((invoice) => (
            <InvoicePreview invoice={invoice} key={invoice?.id} />
          ))}
      </div>
    </div>
  );
}

export default Invoices;
