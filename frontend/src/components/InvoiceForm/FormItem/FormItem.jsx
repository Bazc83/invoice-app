import { useEffect, useReducer } from 'react';

import { ItemForm } from '../ItemForm';
import { useFormItemReducer } from './useFormItemReducer';

export function FormItem({ item, onItemSave, handleDeleteItem, itemIndex }) {
  const { itemReducer } = useFormItemReducer();

  const initialValue = {
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  };

  const [state, dispatch] = useReducer(itemReducer, {
    formItem: initialValue,
  });

  // state de-structured
  const { formItem } = state;

  const handleSave = (formItemValue) => {
    onItemSave(formItemValue);
  };

  const handleDelete = (itemId, e) => {
    e.preventDefault();

    handleDeleteItem(itemId);
  };

  useEffect(() => {
    dispatch({ type: 'itemTotal' });
  }, [formItem.price, formItem.quantity]);

  useEffect(() => {
    dispatch({ type: 'itemId', payload: { itemId: item.itemId } });
  }, [item.itemId]);

  return (
    <ItemForm
      formItem={formItem}
      dispatch={dispatch}
      handleSave={handleSave}
      handleDelete={handleDelete}
      itemIndex={itemIndex}
    />
  );
}

export default FormItem;
