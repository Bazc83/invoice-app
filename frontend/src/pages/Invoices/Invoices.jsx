import { set } from 'mongoose';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getInvoices } from '../../features/invoice/invoicesSlice';
import { InvoiceForm } from './Invoice/InvoiceForm/InvoiceForm';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';

import { NoInvoices } from './NoInvoices/NoInvoices';

export const Invoices = () => {
  
  const [showForm, setShowForm] = useState(true);

  const dispatch = useDispatch();

  const { invoices, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    dispatch(getInvoices());
    setShowForm(false);
  }, []);

  return (
    <div className={`container main-bg`}>
      <Outlet />

      <InvoicesPageControls
        invoicesData={invoices?.length}
        setShowForm={setShowForm}
      />
      {showForm && <InvoiceForm newInvoice setShowForm={setShowForm} />}
      {invoices?.length === 0 && <NoInvoices />}
      <div className={styles.invoicesWrapper}>
        {invoices.length > 0 &&
          invoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
