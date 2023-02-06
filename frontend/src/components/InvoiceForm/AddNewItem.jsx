import { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import itemReducer from '../EditFormItem/itemReducer';
import ItemFormTemplate from './ItemFormTemplate';

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

  const addItemToItemsArray = () => {
    addItem(state);
    dispatch({ type: 'resetItemForm', payload: initialValue });

    setShowNewItemInput(false);
  };

  const cancelAddNewItem = () => {
    setShowNewItemInput(false);
  };

  return (
    <ItemFormTemplate
      state={state}
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
