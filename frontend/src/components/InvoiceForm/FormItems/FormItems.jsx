import { Button } from "@/components/Button";
import { useState } from "react";
import { AddNewItem } from "../AddNewItem/AddNewItem";
import { FormItem } from "../FormItem/FormItem";

export const FormItems = ({ itemsArray, setItemsArray, handleAddItemToQuery}) => {
  const [showNewItemInput, setShowNewItemInput] = useState(false);

  const onItemChange = (itemVal) => {
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
    <div className={"flex flex-col gap-2"}>
      <h2 className="secondary-text text-lg font-semibold my-4">Item List</h2>
      <div className="flex flex-col gap-6">
    
        {itemsArray.map((item, i) => (
      
          <FormItem
            itemIndex={i}
            item={item}
            key={item.itemId}
            onItemChange={onItemChange}
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
      <Button
        btnStyle="btnThree"
        fullWidth
        onClick={(e) => handleShowNewItemForm(e)}
      >
        + Add New Item
      </Button>
    </div>
  );
};
