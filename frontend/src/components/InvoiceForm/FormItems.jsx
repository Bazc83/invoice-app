import { useContext, useState } from 'react';

import { InvoiceContext } from '@/context/InvoiceContext';

import ItemFormTemplate from './ItemFormTemplate';

export function FormItems() {
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const { state, dispatch } = useContext(InvoiceContext);

  const onItemSave = (itemVal) => {
    dispatch({ type: 'updateItem', payload: itemVal });
  };

  const addItem = (item) => {
    dispatch({ type: 'addItem', payload: item });
  };

  const handleDelete = (itemToDelete) => {
    dispatch({ type: 'deleteItem', payload: itemToDelete });
  };

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pt-6 text-lg">Items:</h2>
      <div
        className={`flex flex-col gap-6 rounded-md    ${
          state.itemsArray.length === 0 && !showNewItemInput && 'hidden'
        }`}
      >
        {/* Map state.itemsArray if array is not empty */}
        {state.itemsArray.length !== 0 &&
          state.itemsArray.map((item) => (
            <ItemFormTemplate
              item={item}
              key={item.itemId}
              onItemSave={onItemSave}
              handleDelete={handleDelete}
            />
          ))}

        {showNewItemInput && (
          <ItemFormTemplate
            addItem={addItem}
            setShowNewItemInput={setShowNewItemInput}
            handleDelete={handleDelete}
            onItemSave={onItemSave}
            newForm
          />
        )}
      </div>

      <button
        type="button"
        className=" btn   btn | 
        col-span-3 col-start-4 mt-2 flex  items-center justify-center gap-2 border border-gray-700
        text-gray-700 hover:bg-gray-700 hover:text-white dark:border-gray-200 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
        onClick={(e) => handleShowNewItemForm(e)}
      >
        + Add Item
      </button>
    </div>
  );
}

export default FormItems;
