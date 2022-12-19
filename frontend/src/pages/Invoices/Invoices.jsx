import data from '@data/data.json';
import { Outlet } from 'react-router-dom';
import { InvoicePreview } from './InvoicePreview';
import styles from './Invoices.module.css';
import { InvoicesPageControls } from './InvoicesPageControls/InvoicesPageControls';
import { NoInvoices } from './NoInvoices/NoInvoices';

export const Invoices = () => {
  console.log(data);
  return (
    <div className={`container main-bg`}>
      <Outlet />

      <InvoicesPageControls invoicesData={data.length} />

      <div className={styles.invoicesWrapper}>
        {data &&
          data?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice.id} />;
          })}
      </div>
    </div>
  );
};
