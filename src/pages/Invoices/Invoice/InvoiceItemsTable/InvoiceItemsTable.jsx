import { useEffect } from 'react';
import { useSubCollection } from '../../../../hooks/useSubCollection';
import styles from './InvoiceItemsTable.module.css';
import { InvoiceTableItem } from './InvoiceTableItem/InvoiceTableItem';
export const InvoiceItemsTable = ({ invoiceId }) => {
  const { subCollectionData, getSubCollectionData } = useSubCollection();

  useEffect(() => {
    getSubCollectionData(invoiceId, 'items');
  }, []);
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
        {subCollectionData?.map((item, i) => {
          return <InvoiceTableItem key={`tableItem${i}`} item={item} />;
        })}
      </tbody>
    </table>
  );
};
// item name QTY  Price   Total
