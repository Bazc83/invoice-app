import { DarkModeContext } from '@/App';
import { useContext } from 'react';
import data from '../../data/data.json';
import { InvoicePreview } from './InvoicePreview';
import { InvoicesPageControls } from './InvoicesPageControls';
import styles from './styles/Invoices.module.css';
export const Invoices = () => {
  const { light } = useContext(DarkModeContext);

  return (
    <div
      className={`container `}
      style={{ '--invoices-bg': `${light ? '#f2f2f2' : '#141625'}` }}>
      <InvoicesPageControls light={light} />

      <div className={styles.invoicesWrapper}>
        {data.map((invoice) => {
          return (
            <InvoicePreview
            invoice={invoice}
              key={invoice.id}
 
              light={light}
            />
          );
        })}
      </div>
      {/* <InvoicePreview
          invoiceRef={'RT3080'}
          name={'Jensen Huang'}
          dueDate={'Due  20 Sep 2021'}
          amount={'1,800.90'}
          paymentStatus={'paid'}
          light={light}
        />
        <InvoicePreview
          invoiceRef={'XM9141'}
          name={'Alex Grimm'}
          dueDate={'Due 20 Sep 2021'}
          amount={'556.00'}
          paymentStatus={'pending'}
          light={light}
        />
        <InvoicePreview
          invoiceRef={'RG0314'}
          name={'John Morrison'}
          dueDate={'Due 01 Oct 2021'}
          amount={'14,002.33'}
          paymentStatus={'paid'}
          light={light}
        />
        <InvoicePreview
          invoiceRef={'RT2080'}
          name={'Alysa Werner'}
          dueDate={'Due 12 Oct 2021'}
          amount={'102.04'}
          paymentStatus={'pending'}
          light={light}
        />
        <InvoicePreview
          invoiceRef={'FV2353'}
          name={'Anita Wainwright'}
          dueDate={'Due 12 Nov 2021'}
          amount={'3,102.04'}
          paymentStatus={'draft'}
          light={light}
        /> */}
    </div>
  );
};
