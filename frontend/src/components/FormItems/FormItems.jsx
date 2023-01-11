import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';

import { InvoiceFormItem } from '@/components/InvoiceFormItem';
import { NewInvoiceItem } from '../NewInvoiceItem';
import styles from './FormItems.module.css';

export const FormItems = ({ items, onItemsChange, setAmountDue }) => {
  const [itemsArray, setItemsArray] = useState(items);
  const [showNewItemInput, setShowNewItemInput] = useState(false);

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

  const handleDeleteItem = (itemToDeleteId) => {
    setItemsArray((prev) => [
      ...prev?.filter((val) => val.itemId !== itemToDeleteId),
    ]);
  };

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  useEffect(() => {
    setAmountDue(itemsArray.reduce((acc, curr) => acc + curr.total, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsArray]);

  useEffect(() => {
    onItemsChange(itemsArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsArray]);

  return (
    <div className={styles.formItemsSection}>
      <h2>Item List</h2>
      <div className={styles.items}>
        {items?.map((item, i) => (
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
