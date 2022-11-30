import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import styles from './styles/InvoicesPageController.module.css';
export const InvoicesPageControls = ({ light, invoicesData }) => {
  return (
    <div className={styles.invoicesPageController}>
      <div className={styles.invoicesControllerLeftSide}>
        <h2 className={`${light ? 'text-dark' : 'text-light'}`}>Invoices</h2>
        <p className={`${light ? 'faded-text-dark' : 'faded-text-light'}`}>
          {invoicesData === 0 ? 'No' : invoicesData} invoices
        </p>
      </div>

      <div className={styles.invoicesControllerRightSide}>
        <Filter light={light} />
        <Button plusIcon>New</Button>
      </div>
    </div>
  );
};
