import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NoInvoices } from '@/components/NoInvoices';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useInvoices } from '../../hooks/reactQueryHooks/useInvoices';
import styles from './Invoices.module.css';

export const Invoices = () => {
  const { isLoading, isError, error, data: invoices } = useInvoices();

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
