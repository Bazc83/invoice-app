import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../Button';
import { FormInput } from '../FormInput';

import styles from './AddNewItem.module.css';
export const AddNewItem = ({ addItem, setShowNewItemInput }) => {
  const newId = uuidv4();

  const [formItem, setFormItem] = useState({
    itemId: newId,
    name: '',
    quantity: 1,
    price: 0.0,
    total: 0.0,
  });

  const setItemTotal = (itemPrice, itemQuantity) => {
    setFormItem((prev) => ({ ...prev, total: +itemPrice * +itemQuantity }));
  };

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

    setItemTotal(formItem.price, formItem.quantity);
  };

  const addItemToItemsArray = (e) => {
    e.preventDefault();
    addItem(formItem);
    setShowNewItemInput((prev) => !prev);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  const validatePrice = (e) => {
    if (+e.target.value >= 0.0) {
      setFormItem((prev) => ({ ...prev, price: prev.price.toFixed(2) }));
    } else if (+e.target.value < 0.0 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, price: 0.0 }));
    }
  };

  const validateQty = (e) => {
    if (+e.target.value >= 1) {
      return setFormItem((prev) => ({ ...prev, quantity: prev.quantity }));
    } else if (+e.target.value < 1 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, quantity: 1 }));
    }
  };

  useEffect(() => {
    setItemTotal(formItem.price, formItem.quantity);
  }, [formItem.price, formItem.quantity]);

  return (
    <div>
      <h4 style={{ paddingBottom: '0.5rem' }}>Add A New Item</h4>
      <div className={styles.invoiceFormItem}>
        <FormInput
          type='text'
          itemName='name'
          itemLabel='Item Names'
          value={formItem.name}
          className={styles.name}
          setValue={handleInputChange}
        />

        <FormInput
          type='number'
          itemName='quantity'
          itemLabel='Qty.'
          value={formItem.quantity}
          maxWidth={'max-content'}
          className={styles.qty}
          setValue={handleInputChange}
          onBlur={validateQty}
        />

        <FormInput
          type='number'
          itemName='price'
          itemLabel='Price'
          value={formItem.price}
          setValue={handleInputChange}
          maxWidth={'max-content'}
          className={styles.price}
          step={0.01}
          onBlur={validatePrice}
        />

        <FormInput
          type='number'
          itemName='total'
          itemLabel='Total'
          value={formItem.total.toFixed(2)}
          maxWidth={'max-content'}
          className={styles.total}
          disabled
          noBg
        />

        <div className={styles.icon}>
          <FaTrashAlt className={styles.trashIcon} />
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button onClick={handleCancel} btnStyle={'btnFour'}>
          Cancel
        </Button>
        <Button onClick={(e) => addItemToItemsArray(e)} btnStyle={'btnFive'}>
          Add Item To Invoice
        </Button>
      </div>
    </div>
  );
};
