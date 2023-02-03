import { useContext, useState } from 'react';

import { InvoiceContext } from '@/context/InvoiceContext';

import { AddNewItem } from './AddNewItem';
import { FormItem } from './FormItem/FormItem';

export function FormItems() {
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const { state, dispatch } = useContext(InvoiceContext);

  const onItemSave = (itemVal) => {
    dispatch({ type: 'updateItem', payload: itemVal });
  };

  const addItem = (item) => {
    dispatch({ type: 'addItem', payload: item });
  };

  const handleDeleteItem = (itemToDelete) => {
    dispatch({ type: 'deleteItem', payload: itemToDelete });
  };

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="secondary-text text-lg font-semibold">Items</h2>
      <div
        className={`flex flex-col gap-6 rounded-md bg-gray-400 p-3  dark:bg-gray-900  ${
          state.itemsArray.length === 0 && !showNewItemInput && 'hidden'
        }`}
      >
        {/* Map state.itemsArray if array is not empty */}
        {state.itemsArray.length !== 0 &&
          state.itemsArray.map((item, i) => (
            <FormItem
              itemIndex={i}
              item={item}
              key={item.itemId}
              onItemSave={onItemSave}
              handleDeleteItem={handleDeleteItem}
            />
          ))}

        {showNewItemInput && (
          <AddNewItem
            addItem={addItem}
            setShowNewItemInput={setShowNewItemInput}
            handleDeleteItem={handleDeleteItem}
            onItemSave={onItemSave}
          />
        )}
      </div>

      <button
        type="button"
        className=" btn   col-span-3 col-start-4 
        btn | flex items-center  justify-center gap-2 border hover:bg-gray-700 hover:text-white
        border-gray-700 dark:border-gray-200 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900 mt-2"
        
        onClick={(e) => handleShowNewItemForm(e)}
      >
        + Add Item
      </button>
    </div>
  );
}

export default FormItems;
