import { useEffect, useReducer } from 'react';

import ItemFormTemplate from '../InvoiceForm/ItemFormTemplate';
import itemReducer from './itemReducer';

export function EditFormItem({
  item,
  onItemSave,
  handleDeleteItem,
  itemIndex
}) {


  const initialValue = {
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
    error: false,
  };

  const [state, dispatch] = useReducer(itemReducer, initialValue);

  const handleSave = (formItemValue) => {
    onItemSave(formItemValue);
  };

  const handleDelete = (itemId, e) => {
    e.preventDefault();
    handleDeleteItem(itemId);
  };

  useEffect(() => {
    dispatch({ type: 'itemTotal' });
  }, [state.price, state.quantity]);

  useEffect(() => {
    dispatch({ type: 'itemId', payload: { itemId: item.itemId } });
  }, [item.itemId]);

  return (
    <ItemFormTemplate
      state={state}
      dispatch={dispatch}
      handleSave={handleSave}
      handleDelete={handleDelete}
      itemIndex={itemIndex}
    />
  );
}

export default EditFormItem;
