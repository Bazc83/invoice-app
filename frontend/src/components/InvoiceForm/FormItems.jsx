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

      <div className="flex flex-col gap-6 rounded-md bg-gray-400 p-3 pb-8 dark:bg-gray-900 sm:p-6 sm:pb-10 ">
        {state.itemsArray.map((item, i) => (
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

        <button
          type="button"
          className=" btn  col-span-3 col-start-4 row-start-3 flex items-center justify-center  gap-2 bg-emerald-700  hover:bg-emerald-900 "
          onClick={(e) => handleShowNewItemForm(e)}
        >
          + Add New Item
        </button>
      </div>
    </div>
  );
}

export default FormItems;
