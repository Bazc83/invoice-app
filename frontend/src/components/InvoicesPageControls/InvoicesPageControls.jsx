import { Button } from '@/components/Button';
import { FilterModal } from '@/components/FilterModal';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useContext } from 'react';
import styles from './InvoicesPageControls.module.css';

export const InvoicesPageControls = ({ invoicesData }) => {
  const { dispatch } = useContext(InvoicesContext);

  return (
    <div className={styles.invoicesPageController}>
      <div className={styles.invoicesControllerLeftSide}>
        <h2>Invoices</h2>
        <p className='text-faded'>
          {invoicesData === 0 ? 'No' : invoicesData}{' '}
          {invoicesData === 1 ? 'invoice' : 'invoices'}
        </p>
      </div>

      <div className={styles.invoicesControllerRightSide}>
        {/* FilterModal invoices compontent */}
        <FilterModal />

        {/* Button shows new invoice form */}
        <Button
          plusIcon
          onClick={() => dispatch({ type: 'toggleInvoiceForm' })}>
          New
        </Button>
      </div>
    </div>
  );
};
