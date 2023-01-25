import { Button } from '@/components/Button';
import { FilterModal } from '@/components/FilterModal';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';
import { useContext, useEffect } from 'react';

export const Invoices = () => {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className='primary-bg flex flex-col px-6  md:px-8 '>
      {/* Page controls contains filter modal */}

      <div className='flex justify-between items-center  px-8 py-4 mt-8 mb-4 secondary-bg rounded-md'>

        {/* Button shows new invoice form */}
        <Button
          plusIcon
          onClick={() => dispatch({ type: 'toggleInvoiceForm' })}>
          New
        </Button>

        {/* FilterModal invoices compontent */}
        <FilterModal />
      </div>


      {/* Add new invoice */}
      {state.showInvoiceForm && <NewInvoiceForm />}

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}

      <div className={'flex flex-col gap-8 pb-8 pt-4 '}>
        {/* invoice previews */}
        {invoices?.length > 0 &&
          state.filteredInvoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
