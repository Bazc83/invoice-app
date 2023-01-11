import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Button';
import { InvoiceFormInput } from './InvoiceFormInput';

import styles from './InvoiceFormItem/InvoiceFormItem.module.css';

export const NewInvoiceItem = ({ onItemChange, setShowNewItemInput }) => {
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const [formItem, setFormItem] = useState({});

  useEffect(() => {
    setTotal(+price * +(+quantity));
  }, [price, quantity]);

  const addItem = (e) => {
    e.preventDefault();
    setFormItem({
      itemId: itemId,
      name: name,
      quantity: quantity,
      price: price,
      total: total,
    });
  };

  useEffect(() => {
    if (itemId === '') setItemId(uuidv4());
  }, [itemId]);

  useEffect(() => {
    if (formItem.itemId === undefined) return;
    if (formItem.itemId) {
      onItemChange(formItem);
      setShowNewItemInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formItem]);

  return (
    <div>
      <h1>Add new item</h1>
      <div className={styles.invoiceFormItem}>
        <InvoiceFormInput
          type='text'
          itemName='name'
          itemLabel='Item Names'
          value={name || ''}
          className={styles.name}
          setValue={(e) => setName(e.target.value)}
          item
        />

        <InvoiceFormInput
          type='number'
          itemName='quantity'
          itemLabel='Qty.'
          value={quantity || 1}
          maxWidth={'max-content'}
          className={styles.qty}
          setValue={(e) => setQuantity(+e.target.value)}
          item
        />
        
        <InvoiceFormInput
          type='number'
          itemName='price'
          itemLabel='Price'
          value={price || 0.0}
          setValue={(e) => setPrice(+e.target.value)}
          maxWidth={'max-content'}
          className={styles.price}
          item
        />
        <InvoiceFormInput
          type='number'
          itemName='total'
          itemLabel='Total'
          value={total || 0}
          maxWidth={'max-content'}
          className={styles.total}
          disabled
          noBg
          item
        />

        <div className={styles.icon}>
          <FaTrashAlt className={styles.trashIcon} />
        </div>
      </div>

      <Button onClick={addItem}>Add Item</Button>
      <Button>Cancel</Button>
    </div>
  );
};
