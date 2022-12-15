import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';

export const InvoiceFormItem = ({ item, setValue }) => {
  const [total, setTotal] = useState(0);

  if (!item?.price) return null;

  const totalItemValue = (price, qty) => {
    setTotal((prev) => (prev = qty * price));
  };

  const [itemName, setItemName] = useState(item?.name);
  const [itemQuantity, setItemQuantity] = useState(item?.quantity);
  const [itemPrice, setItemPrice] = useState(+item?.price);
  const [itemTotal, setItemTotal] = useState(+itemQuantity * +itemPrice);
  const [itemId, setItemId] = useState(item?.itemId);


  useEffect(()=>{
    setItemTotal(+itemQuantity * +itemPrice);
    console.log(itemQuantity * itemPrice)
  }, [itemPrice, itemQuantity])


  useEffect(() => {
    totalItemValue(item.price, item.quantity);
  }, [item]);

  useEffect(() => {
    setValue((prev) => [
      ...prev.filter((val) => val.itemId !== itemId),
      {
        itemId: itemId,
        name: itemName,
        quantity: +itemQuantity,
        price: +itemPrice,
        total: +itemTotal,
      },
    ]);
  }, [itemName, itemQuantity, itemPrice, itemTotal]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='itemName'
        itemLabel='Item Name'
        value={itemName}
        setValue={setItemName}
        className={styles.name}
      />

      <InvoiceFormInput
        type='number'
        itemName='itemQty'
        itemLabel='Qty.'
        value={itemQuantity}
        setValue={setItemQuantity}
        maxWidth={'max-content'}
        className={styles.qty}
      />
      <InvoiceFormInput
        type='number'
        itemName='itemPrice'
        itemLabel='Price'
        value={+itemPrice}
        setValue={setItemPrice}
        maxWidth={'max-content'}
        className={styles.price}
      />
      <InvoiceFormInput
        type='number'
        itemName='itemTotal'
        itemLabel='Total'
        value={itemTotal}
        setValue={setItemTotal}
        maxWidth={'max-content'}
        className={styles.total}
        disabled
        noBg
      />

      <div className={styles.icon}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
