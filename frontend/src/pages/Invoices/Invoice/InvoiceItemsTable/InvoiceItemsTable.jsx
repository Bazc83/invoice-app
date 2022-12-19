import styles from './InvoiceItemsTable.module.css';
import { InvoiceTableItem } from './InvoiceTableItem/InvoiceTableItem';
export const InvoiceItemsTable = ({ items }) => {
  return (
    <table className={styles.invoiceItemsTable}>
      <thead>
        <tr className='text-faded-xs'>
          <th>Item Name</th>
          <th>QTY</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, i) => {
          return <InvoiceTableItem key={`tableItem${i}`} item={item} />;
        })}
      </tbody>
    </table>
  );
};
