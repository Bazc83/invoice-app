import { getInvoices } from '@hooks/useInvoicesApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { InvoiceForm } from './Invoice/InvoiceForm/InvoiceForm';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';
import { NoInvoices } from './NoInvoices/NoInvoices';

export const Invoices = () => {
  const {
    isLoading,
    isError,
    error,
    data: invoices,
  } = useQuery(['invoices'], getInvoices);

  const [showForm, setShowForm] = useState(false);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={`container main-bg`}>
      <Outlet />

      <InvoicesPageControls
        invoicesData={invoices?.length}
        setShowForm={setShowForm}
      />
      {showForm && <InvoiceForm newInvoice setShowForm={setShowForm} />}
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
