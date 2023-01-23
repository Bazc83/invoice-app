import { Button } from '@/components/Button';
import { InvoiceFormItem } from '@/components/InvoiceFormItem';
import { useState } from 'react';
import { AddNewItem } from '../AddNewItem/AddNewItem';
import styles from './FormItems.module.css';

export const FormItems = ({
  itemsArray,
  setItemsArray,
}) => {
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const onItemChange = (itemVal) => {
    const itemIndex = itemsArray.findIndex(
      (indexVal) => indexVal.itemId === itemVal.itemId
    );
    if (itemIndex === -1) {
      return;
    } else {
      setItemsArray((prev) => [
        ...prev.slice(0, itemIndex),
        itemVal,
        ...prev.slice(itemIndex + 1),
      ]);
    }
  };

  const addItem = (item) => {
    setItemsArray((prev) => [...prev, item]);
  };

  const handleDeleteItem = (itemToDeleteId) => {
    setItemsArray((prev) =>
      prev.filter((item) => item.itemId !== itemToDeleteId)
    );
  };

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };


  return (
    <div className={styles.formItemsSection}>
      <h2>Item List</h2>
      <div className={styles.items}>
        {itemsArray.map((item, i) => (
          <InvoiceFormItem
            item={item}
            key={item.itemId}
            onItemChange={onItemChange}
            handleDeleteItem={handleDeleteItem}
          />
        ))}

        {showNewItemInput && (
          <AddNewItem
            addItem={addItem}
            setShowNewItemInput={setShowNewItemInput}
          />
        )}
      </div>
      <Button
        btnStyle='btnThree'
        fullWidth
        onClick={(e) => handleShowNewItemForm(e)}>
        + Add New Item
      </Button>
    </div>
  );
};
