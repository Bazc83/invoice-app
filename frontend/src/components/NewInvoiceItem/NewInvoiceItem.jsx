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
    quantity: 1,
    price: 0.0,
    total: 0.0,
  });

  const [totalFixed, setTotalFixed] = useState(formItem.total.toFixed(2));

  const handleInputChange = (e) => {
    if (e.target.name === 'price') {
      setFormItem((prev) => ({
        ...prev,
        [e.target.name]: +e.target.value,
      }));
    } else if (e.target.name === 'quantity') {
      setFormItem((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    setFormItem((prev) => {
      const totalValue = +prev.price * +prev.quantity;

      setTotalFixed(() => totalValue);

      return {
        ...prev,
        total: totalValue,
      };
    });
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
          step={0.01}
          onBlur={() =>
            setFormItem((prev) => ({ ...prev, price: prev.price.toFixed(2) }))
          }
        />
        <InvoiceFormInput
          type='number'
          itemName='total'
          itemLabel='Total'
          value={totalFixed}
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
