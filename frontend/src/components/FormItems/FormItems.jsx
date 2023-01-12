import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';

import { InvoiceFormItem } from '@/components/InvoiceFormItem';
import { NewInvoiceItem } from '../NewInvoiceItem/NewInvoiceItem';
import styles from './FormItems.module.css';

export const FormItems = ({
  invoiceData,
  onItemsChange,
  setAmountDue,
  setFormData,
}) => {
  const [itemsArray, setItemsArray] = useState(invoiceData?.items);

  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const onItemChange = (itemValue) => {
    if (!itemValue) return;
    if (itemsArray?.length === 0) {
      setItemsArray([itemValue]);
    } else {
      setItemsArray((prev) => [
        ...prev.filter((item) => item.itemId !== itemValue.itemId),
        itemValue,
      ]);
    }
  };

  const handleDeleteItem = (itemToDeleteId) => {
    setItemsArray((prev) =>
      prev.filter((item) => item.itemId !== itemToDeleteId)
    );
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: [...itemsArray] }));
  }, [itemsArray, setFormData]);

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  useEffect(() => {
    setAmountDue(
      invoiceData?.items?.reduce((acc, curr) => acc + curr.total, 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData?.items]);

  return (
    <div className={styles.formItemsSection}>
      <h2>Item List</h2>
      <div className={styles.items}>
        {itemsArray?.map((item, i) => (
          <InvoiceFormItem
            item={item}
            key={`item${i}`}
            onItemChange={onItemChange}
            handleDeleteItem={handleDeleteItem}
          />
        ))}

        {showNewItemInput && (
          <NewInvoiceItem
            onItemChange={onItemChange}
            setShowNewItemInput={setShowNewItemInput}
          />
        )}
      </div>
      <Button btnStyle='btnThree' fullWidth onClick={handleShowNewItemForm}>
        + Add New Item
      </Button>
    </div>
  );
};
