import { useContext, useEffect } from 'react';

import { FilterModal } from '@/components/FilterModal';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

import { PageLayoutContext } from '../PageLayout';
import { ShowFiltersAndClear } from './ShowFiltersAndClear';

export function Invoices() {
  const { state, dispatch } = useContext(InvoicesContext);
  const { showNewInvoiceForm, setShowNewInvoiceForm } =
    useContext(PageLayoutContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return 'Loading...';
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <div className="primary-bg relative flex  flex-col gap-4 px-6 pb-8 md:px-8">
      {/* Invoices page controls */}
      <div className="secondary-bg mt-4 flex  flex-wrap-reverse items-center justify-center gap-2 rounded-md p-6 shadow-md sm:justify-between lg:mt-6 ">
        {/* FilterModal invoices compontent */}
        <FilterModal />

        {/* Button shows new invoice form */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-green-900 px-4 py-2 text-sm text-gray-50 sm:w-auto lg:text-base"
          onClick={() => setShowNewInvoiceForm((prev) => !prev)}
        >
          Add Invoice
        </button>
      </div>

      {/* Invoice preview headers md screen and greater */}
      <div className="secondary-bg hidden  gap-1 rounded-md  py-2 shadow-md md:grid  md:grid-cols-[1rem_repeat(10,_1fr)_1rem] md:items-baseline  lg:gap-2">
        <div className="flex  items-baseline justify-between    gap-2  md:col-start-2  md:col-end-5">
          <h4>Ref</h4>
          <h4>Payment Due</h4>
        </div>

        <div className="  md:col-start-6 md:col-end-9   md:text-start lg:text-center">
          <h4>Client Name</h4>
        </div>
        <div className="flex items-center justify-between  gap-2 md:col-start-9 md:col-end-12 md:w-full md:gap-6">
          <h4 className="   w-full  text-center lg:pr-10 lg:text-end">Total</h4>

          <h4 className="w-full  text-center lg:pr-10 lg:text-end">Status</h4>
        </div>
      </div>

      {/* Shows current filters and a button to clear all filters */}
      {state.checkedFilters?.length > 0 && <ShowFiltersAndClear />}

      {/* Add new invoice */}
      {showNewInvoiceForm && <NewInvoiceForm />}

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}

      {/* Invoice previews  */}
      <div className="flex flex-col gap-4 pb-6 ">
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
