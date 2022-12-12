import { useEffect } from 'react';
import { useSubCollection } from '../../../../hooks/useSubCollection';
import { InvoiceItem } from './InvoiceItem/InvoiceItem';
import styles from './InvoiceItems.module.css';
export const InvoiceItems = ({ invoiceId }) => {
  const { subCollectionData, getSubCollectionData } = useSubCollection();

  useEffect(() => {
    getSubCollectionData(invoiceId, 'items');
  }, []);

  return (
    <div className={styles.invoiceItems}>
      {subCollectionData?.map((item, i) => {
        return <InvoiceItem item={item} key={`item${i}`} />;
      })}
    </div>
  );
};
