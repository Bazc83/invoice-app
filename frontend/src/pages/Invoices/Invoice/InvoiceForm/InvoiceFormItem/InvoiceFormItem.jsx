import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceFormInput } from '../InvoiceFormInput';
import styles from './InvoiceFormItem.module.css';
export const InvoiceFormItem = ({ item, setItemsValue }) => {
  const [total, setTotal] = useState(0);

  if (!item?.price) return null;

  const getTotalItemValue = (price, qty) => {
    if (price === 0) return setTotal(0);
    setTotal((prev) => (prev = qty * price));
  };

  const [itemName, setItemName] = useState(item?.name);
  const [itemQuantity, setItemQuantity] = useState(item?.quantity);
  const [itemPrice, setItemPrice] = useState(+item?.price);
  const [itemTotal, setItemTotal] = useState(total || 0);
  const [itemId, setItemId] = useState(item?.itemId);

  useEffect(() => {
    getTotalItemValue(itemPrice, itemQuantity);
  }, [itemPrice, itemQuantity]);

  useEffect(() => {
    setItemsValue((prev) => [
      ...prev.filter((val) => val.itemId !== itemId),
      {
        itemId: itemId,
        name: itemName,
        quantity: +itemQuantity,
        price: itemPrice <= 0 ? 0 : itemPrice,
        total: itemTotal,
      },
    ]);
  }, [itemName, itemQuantity, itemTotal, itemPrice]);

  return (
    <div className={styles.invoiceFormItem}>
      <InvoiceFormInput
        type='text'
        itemName='itemName'
        itemLabel='Item Name'
        value={itemName}
        setValue={setItemName}
        className={styles.name}
        item
      />

      <InvoiceFormInput
        type='number'
        itemName='itemQty'
        itemLabel='Qty.'
        value={itemQuantity}
        setValue={setItemQuantity}
        maxWidth={'max-content'}
        className={styles.qty}
        item
      />
      <InvoiceFormInput
        type='number'
        itemName='itemPrice'
        itemLabel='Price'
        value={+itemPrice}
        setValue={setItemPrice}
        maxWidth={'max-content'}
        className={styles.price}
        item
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
        item
      />

      <div className={styles.icon}>
        <FaTrashAlt className={styles.trashIcon} />
      </div>
    </div>
  );
};
