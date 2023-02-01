import { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useFormItemReducer } from './FormItem/useFormItemReducer';
import { ItemForm } from './ItemForm';

export function AddNewItem({
  addItem,
  setShowNewItemInput,
  handleDeleteItem,
  onItemSave,
}) {
  const newId = uuidv4();

  const initialValue = {
    itemId: newId,
    name: '',
    quantity: 1,
    price: 0.01,
    total: 0.0,
  };

  const { itemReducer } = useFormItemReducer();

  const [state, dispatch] = useReducer(itemReducer, { formItem: initialValue });

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

  const addItemToItemsArray = () => {
    addItem(state.formItem);
    dispatch({ type: 'resetItemForm', payload: initialValue });

    setShowNewItemInput(false);
  };

  const cancelAddNewItem = () => {
    setShowNewItemInput(false);
  };

  return (
    <ItemForm
      formItem={formItem}
      dispatch={dispatch}
      handleSave={handleSave}
      handleDelete={handleDelete}
      newForm
      addItemToItemsArray={addItemToItemsArray}
      cancelAddNewItem={cancelAddNewItem}
    />
  );
}

export default AddNewItem;
