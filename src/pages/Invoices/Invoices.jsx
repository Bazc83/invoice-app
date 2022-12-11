import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getFirestoreCollection } from '../../Firebase/Firebase';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';
import { NoInvoices } from './NoInvoices/NoInvoices';

export const Invoices = () => {
  const { value, loading, error } = getFirestoreCollection('invoices');

  const [dataArrLength, setDataArrLength] = useState(0);

  useEffect(() => {
    if (value !== undefined) {
      setDataArrLength(value.docs.length);
    }
  }, [value]);

  const { updateDocument } = useUpdateDocument();

  return (
    <div className={`container main-bg`}>
      <Outlet />

      {/* // Todo */}
      <InvoicesPageControls invoicesData={dataArrLength} />

      {/* // Todo */}
      {dataArrLength === 0 && <NoInvoices />}

      <div className={styles.invoicesWrapper}>
        {value &&
          value.docs.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice.id} />;
          })}
      </div>
    </div>
  );
};
