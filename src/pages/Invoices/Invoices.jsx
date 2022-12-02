import { Outlet, useNavigate } from 'react-router-dom';
// import data from '../../data/data.json';
import { InvoicePreview } from './InvoicePreview';
import { InvoicesPageControls } from './InvoicesPageControls';
import { NoInvoices } from './NoInvoices';
import styles from './styles/Invoices.module.css';

export const Invoices = () => {
  const data = [];
  const navigate = useNavigate();
  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
    <div className={`container main-bg`}>
      <Outlet />
      <InvoicesPageControls invoicesData={data.length} />

      {data.length === 0 && <NoInvoices />}
      <div className={styles.invoicesWrapper}>
        {data?.length > 0 &&
          data?.map((invoice) => {
            return (
              <InvoicePreview
                invoice={invoice}
                key={invoice.id}
                onClick={() => showFullInvoice(invoice.id)}
              />
            );
          })}
      </div>
    </div>
  );
};
