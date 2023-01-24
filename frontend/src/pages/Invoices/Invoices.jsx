import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';
import { useContext, useEffect } from 'react';
import styles from './Invoices.module.css';

export const Invoices = () => {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={`container main-bg`}>
      {/* Page controls contains filter modal */}
      <InvoicesPageControls invoicesData={invoices?.length} />

      {/* Add new invoice */}
      {state.showInvoiceForm && <NewInvoiceForm />}

      {/* No invoice component */}
      {state.filteredInvoices?.length === 0 && <NoInvoices />}
      <div className={styles.invoicesWrapper}>
        {/* invoice previews */}
        {invoices?.length > 0 &&
          state.filteredInvoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
