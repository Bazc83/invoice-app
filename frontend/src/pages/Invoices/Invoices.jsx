import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { Container } from '@/components/ui';
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
    <Container className={'primary-bg'}>
      {/* Page controls contains filter modal */}
      <InvoicesPageControls invoicesData={invoices?.length} />

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
    </Container>
  );
};
