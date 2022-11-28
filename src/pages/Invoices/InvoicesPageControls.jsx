import { Filter } from '@/components/Filter';
import { Button } from '@/ui/Button';
import styles from '@styles/Invoices.module.css';
export const InvoicesPageControls = ({ light }) => {
  return (
    <div className={styles.invoicesPagesController}>
      <div>
        <h2 className={`${light ? 'text-dark' : 'text-light'}`}>Invoices</h2>
        <p className={`${light ? 'faded-text-dark' : 'faded-text-light'}`}>
          7 invoices
        </p>
      </div>

      <div className={styles.invoicesControllerRightSide}>
        <Filter light={light} />
        <Button plusIcon>New</Button>
      </div>
    </div>
  );
};
