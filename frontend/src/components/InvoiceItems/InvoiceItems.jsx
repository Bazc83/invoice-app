import { InvoiceItem } from './InvoiceItem/InvoiceItem';
import styles from './InvoiceItems.module.css';
export const InvoiceItems = ({ items}) => {

  return (
    <div className={styles.invoiceItems}>
      {items?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};
