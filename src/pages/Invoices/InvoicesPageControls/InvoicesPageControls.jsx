import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import styles from './InvoicesPageControls.module.css';
export const InvoicesPageControls = ({ invoicesData }) => {
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
        <Filter />
        <Button plusIcon>New</Button>
      </div>
    </div>
  );
};
