import { useState } from "react";
import { AddNewItem } from "../AddNewItem/AddNewItem";
import { FormItem } from "../FormItem/FormItem";

export const FormItems = ({
  itemsArray,
  setItemsArray,
  handleAddItemToQuery,
}) => {
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const onItemSave = (itemVal) => {
    const itemIndex = itemsArray.findIndex(
      (indexVal) => indexVal.itemId === itemVal.itemId
    );
    if (itemIndex === -1) {
      return;
    } else {
      setItemsArray((prev) => [
        ...prev.slice(0, itemIndex),
        itemVal,
        ...prev.slice(itemIndex + 1),
      ]);
    }
  };

  const addItem = (item) => {
    setItemsArray((prev) => [...prev, item]);
  };

  const handleDeleteItem = (itemToDeleteId) => {
    setItemsArray((prev) =>
      prev.filter((item) => item.itemId !== itemToDeleteId)
    );
  };

  const handleShowNewItemForm = (e) => {
    e.preventDefault();
    setShowNewItemInput((prev) => !prev);
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <h2 className="secondary-text text-lg font-semibold">Item List</h2>
      <div className="flex flex-col gap-6">
        {itemsArray.map((item, i) => (
          <FormItem
            itemIndex={i}
            item={item}
            key={item.itemId}
            onItemSave={onItemSave}
            handleDeleteItem={handleDeleteItem}
            handleAddItemToQuery={handleAddItemToQuery}
          />
        ))}

        {showNewItemInput && (
          <AddNewItem
            addItem={addItem}
            setShowNewItemInput={setShowNewItemInput}
          />
        )}
      </div>

      <button className="btn secondary-bg " onClick={(e) => handleShowNewItemForm(e)}>+ Add New Item</button>
    </div>
  );
};
