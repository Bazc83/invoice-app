import { DarkModeContext } from '@/App';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import data from '../../data/data.json';
import { InvoicePreview } from './InvoicePreview';
import { InvoicesPageControls } from './InvoicesPageControls';
import { NoInvoices } from './NoInvoices';
import styles from './styles/Invoices.module.css';

export const Invoices = () => {
  const { light } = useContext(DarkModeContext);
  // const data = [];
  const navigate = useNavigate();
  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
    <div
      className={`container `}
      style={{ '--invoices-bg': `${light ? '#f2f2f2' : '#141625'}` }}>
      <Outlet />
      <InvoicesPageControls light={light} invoicesData={data.length} />

      {data.length === 0 && <NoInvoices light={light} />}
      <div className={styles.invoicesWrapper}>
        {data?.length > 0 &&
          data?.map((invoice) => {
            return (
              <InvoicePreview
                invoice={invoice}
                key={invoice.id}
                light={light}
                onClick={() => showFullInvoice(invoice.id)}
              />
            );
          })}
      </div>
    </div>
  );
};
