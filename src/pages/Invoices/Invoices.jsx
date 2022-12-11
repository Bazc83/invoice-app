import { Outlet, useNavigate } from 'react-router-dom';
import { getFirestoreCollection } from '../../Firebase/Firebase';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';
import { NoInvoices } from './NoInvoices/NoInvoices';

import data from '../../data/data.json';

export const Invoices = () => {

  const { value, loading, error } = getFirestoreCollection('invoices');

  const { updateDocument } = useUpdateDocument();


  return (
 
      <div className={`container main-bg`}>
        <Outlet />

        <InvoicesPageControls invoicesData={data.length} />

        {data.length === 0 && <NoInvoices />}
        <div className={styles.invoicesWrapper}>
          {value &&
            value.docs.map((invoice) => {
              return <InvoicePreview invoice={invoice} key={invoice.id} />;
            })}
        </div>
      </div>
  );
};
