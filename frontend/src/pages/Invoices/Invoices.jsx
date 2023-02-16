import { useContext, useEffect } from 'react';

import InvoicesControlPanel from '@/components/InvoicesControlPanel';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

export function Invoices() {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return 'Loading...';
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <div className="primary-bg relative mx-auto flex h-full max-w-6xl flex-col gap-4  border border-white px-6 py-8 md:px-8 lg:grid lg:grid-cols-[200px_1fr]">
      {/* filter checkboxes and add new invoice button */}
      <InvoicesControlPanel state={state} />

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}

      <div className="flex flex-col gap-4 border border-orange-400  ">
        {/* Invoice preview headers md screen and greater */}
        {state.filteredInvoices?.length > 0 && (
          <div className="secondary-bg hidden  gap-1 rounded-md  py-4 shadow-md md:grid  md:grid-cols-[1rem_repeat(10,_1fr)_1rem] md:items-baseline  lg:gap-2 ">
            <div className="flex  items-baseline justify-between    gap-2  md:col-start-2  md:col-end-5">
              <h4>Ref</h4>
              <h4>Payment Due</h4>
            </div>

            <div className="  md:col-start-6 md:col-end-9   md:text-start lg:text-center">
              <h4>Client Name</h4>
            </div>
            <div className="flex items-center justify-between  gap-2 md:col-start-9 md:col-end-12 md:w-full md:gap-6">
              <h4 className="   w-full  text-center lg:pr-10 lg:text-end">
                Total
              </h4>

              <h4 className="w-full  text-center lg:pr-10 lg:text-end">
                Status
              </h4>
            </div>
          </div>
        )}

        {/* Invoice previews  */}
        <div className="flex max-h-full flex-col gap-4 overflow-auto">
          {/* invoice previews */}
          {invoices?.length > 0 &&
            state.filteredInvoices?.map((invoice) => (
              <InvoicePreview invoice={invoice} key={invoice?.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
