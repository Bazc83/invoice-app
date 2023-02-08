import {  useState } from 'react';

import NewItemForm from '../NewItemForm';
import ItemFormTemplate from './ItemFormTemplate';

export function FormItems({ invoiceData }) {
  const [newForm, setNewForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="pt-6 text-lg">Items:</h2>
      <div
        className={`flex flex-col gap-6 rounded-md    ${
          invoiceData?.items.length === 0 && !newForm && 'hidden'
        }`}
      >
        {/* Map state.itemsArray if array is not empty */}
        {invoiceData?.items?.length !== 0 &&
          invoiceData?.items?.map((item) => (
            <ItemFormTemplate
              item={item}
              key={item.itemId}
              newForm={newForm}
              setNewForm={setNewForm}
            />
          ))}

        {newForm && <NewItemForm setNewForm={setNewForm} />}
      </div>

      {!newForm && (
        <button
          type="button"
          className=" btn   btn | 
        col-span-3 col-start-4 mt-2 flex  items-center justify-center gap-2 border border-gray-700
        text-gray-700 hover:bg-gray-700 hover:text-white dark:border-gray-200 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900"
          onClick={() => setNewForm((prev) => !prev)}
        >
          + Add Item
        </button>
      )}
    </div>
  );
}

export default FormItems;
