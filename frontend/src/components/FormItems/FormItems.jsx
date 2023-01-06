import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';

import { InvoiceFormItem } from '@/components/InvoiceFormItem';
import styles from './FormItems.module.css';
export const FormItems = ({ items, invoiceId, onItemsChange}) => {
  const [formItem, setFormItem] = useState();

  const updateFormItem = (formItemData) => {
    setFormItem(formItemData);
  };

  useEffect(() => {
    onItemsChange(formItem);
  }, [formItem]);

  return (
    <div className={styles.formItemsSection}>
      <h2>Item List</h2>
      <div className={styles.items}>
        {items?.map((item, i) => (
          <InvoiceFormItem
            item={item}
            key={`item${i}`}
            value={item?.name}
            updateFormItem={updateFormItem}
            invoiceId={invoiceId}
          />
        ))}
      </div>

      <Button btnStyle='btnThree' fullWidth>
        + Add New Item
      </Button>
    </div>
  );
};
