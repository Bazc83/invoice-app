import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';

import { InvoiceFormItem } from '@/components/InvoiceFormItem';
import styles from './FormItems.module.css';

export const FormItems = ({ items, invoiceId, onItemsChange }) => {
  const [itemsArray, setItemsArray] = useState(items);

  const onItemChange = (itemValue) => {
    if (!itemValue) return;
    if (itemsArray?.length === 0) {
      setItemsArray([itemValue]);
    } else {
      setItemsArray((prev) => [
        ...prev?.filter((val) => val.itemId !== itemValue.itemId),
        itemValue,
      ]);
    }
  };

  useEffect(() => {
    onItemsChange(itemsArray);
  }, [itemsArray]);

  return (
    <div className={styles.formItemsSection}>
      <h2>Item List</h2>
      <div className={styles.items}>
        {items?.map((item, i) => (
          <InvoiceFormItem
            item={item}
            key={`item${i}`}
            value={item?.name}
            invoiceId={invoiceId}
            onItemChange={onItemChange}
          />
        ))}
      </div>

      <Button btnStyle='btnThree' fullWidth>
        + Add New Item
      </Button>
    </div>
  );
};
