
import { InvoicePreview } from '@/components/InvoicePreview';
import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NewInvoiceForm } from '@/components/NewInvoiceForm/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { useState } from 'react';
import { useInvoices } from '../../hooks/reactQueryHooks/useInvoices';
import styles from './Invoices.module.css';

export const Invoices = () => {
  const { isLoading, isError, error, data: invoices } = useInvoices();

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={`container main-bg`}>
      <InvoicesPageControls
        invoicesData={invoices?.length}
        setShowInvoiceForm={setShowInvoiceForm}
      />

      {showInvoiceForm && (
        <NewInvoiceForm setShowInvoiceForm={setShowInvoiceForm} />
      )}
      {invoices.length === 0 && <NoInvoices />}
      <div className={styles.invoicesWrapper}>
        {invoices.length > 0 &&
          invoices.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
