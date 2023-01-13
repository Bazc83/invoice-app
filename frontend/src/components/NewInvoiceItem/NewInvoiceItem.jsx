import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../Button';
import { InvoiceFormInput } from '../InvoiceFormInput';

import styles from './NewInvoiceItem.module.css';
export const NewInvoiceItem = ({ addNewItem, setShowNewItemInput }) => {
  const newId = uuidv4();

  const [formItem, setFormItem] = useState({
    itemId: newId,
    name: '',
    quantity: 0,
    price: 0.0,
    total: 0,
  });

  const handleInputChange = (e) => {
    if (e.target.name === 'price' || e.target.name === 'quantity') {
      setFormItem((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setFormItem((prev) => ({ ...prev, total: +prev.price * +prev.quantity }));
  };

  const addItem = (e) => {
    e.preventDefault();
    addNewItem(formItem);
    setShowNewItemInput((prev) => !prev);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  return (
    <div>
      <h4 style={{ paddingBottom: '0.5rem' }}>Add A New Item</h4>
      <div className={styles.invoiceFormItem}>
        <InvoiceFormInput
          type='text'
          itemName='name'
          itemLabel='Item Names'
          value={formItem.name}
          className={styles.name}
          setValue={handleInputChange}
          item
        />

        <InvoiceFormInput
          type='number'
          itemName='quantity'
          itemLabel='Qty.'
          value={formItem.quantity}
          maxWidth={'max-content'}
          className={styles.qty}
          setValue={handleInputChange}
          item
        />

        <InvoiceFormInput
          type='number'
          itemName='price'
          itemLabel='Price'
          value={formItem.price}
          setValue={handleInputChange}
          maxWidth={'max-content'}
          className={styles.price}
          item
        />
        <InvoiceFormInput
          type='number'
          itemName='total'
          itemLabel='Total'
          value={formItem.total}
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

      <Button onClick={(e) => addItem(e)}>Add Item To Invoice</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>
  );
};
