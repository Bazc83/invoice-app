import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { FormItemInput } from "@/ui/FormItemInput";

export const FormItem = ({
  item,
  onItemChange,
  handleDeleteItem,
  itemIndex,

}) => {
  const [formItem, setFormItem] = useState({
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  });

  const handleDelete = (e) => {
    e.preventDefault();
    handleDeleteItem(item.itemId);
  };

  const setItemTotal = (itemPrice, itemQuantity) => {
    setFormItem((prev) => ({ ...prev, total: +itemPrice * +itemQuantity }));
  };

  const handleInputChange = (e) => {
    if (e.target.name === "price" || e.target.name === "quantity") {
      setFormItem((prev) => ({ ...prev, [e.target.name]: +e.target.value }));
    } else {
      setFormItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setItemTotal(formItem.price, formItem.quantity);
  };

  const validatePrice = (e) => {
    if (+e.target.value >= 0.0) {
      setFormItem((prev) => ({ ...prev, price: prev.price }));
    } else if (+e.target.value < 0.0 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, price: 0.0 }));
    }
  };

  const validateQty = (e) => {
    if (+e.target.value >= 1) {
      return setFormItem((prev) => ({ ...prev, quantity: prev.quantity }));
    } else if (+e.target.value < 1 || e.target.value === undefined) {
      setFormItem((prev) => ({ ...prev, quantity: 1 }));
    }
  };

  useEffect(() => {
    setItemTotal(formItem.price, formItem.quantity);
  }, [formItem.price, formItem.quantity]);

  useEffect(() => {
    setFormItem((prev) => ({ ...prev, itemId: item.itemId }));
  }, [item.itemId, setFormItem]);

  useEffect(() => {
    onItemChange(formItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formItem]);

  const handleSaveChanges = ()=>{
    console.log(formItem)

    onItemChange(formItem)
  }

  return (
    <div className="flex flex-col gap-2">
      <h2>Item {itemIndex + 1}</h2>
      <div className="flex flex-row flex-wrap gap-2">
        <FormItemInput>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            value={formItem?.name}
            onChange={handleInputChange}
            className="md:w-max"
          />
        </FormItemInput>

        <FormItemInput>
          <label htmlFor="quantity">Qty</label>
          <input
            type="number"
            name="quantity"
            value={formItem?.quantity}
            onChange={handleInputChange}
            min={1}
            max={100}
            step={1}
            onBlur={validateQty}
            className="text-center md:w-[80px]"
          />
        </FormItemInput>

        <FormItemInput>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formItem?.price}
            onChange={handleInputChange}
            min={0.01}
            step={0.01}
            onBlur={validatePrice}
          />
        </FormItemInput>
        <FormItemInput>
          <label htmlFor="total">Total</label>
          <input
            type="number"
            name="total"
            value={formItem?.total.toFixed(2)}
            disabled={true}
          />
        </FormItemInput>

        <button type="button"  className="btn mt-4 flex items-center justify-center gap-2 bg-green-700  text-sm hover:bg-green-900" onClick={handleSaveChanges}>Save Changes</button>
        <button type="button"
          className=" btn mt-4 flex items-center justify-center gap-2 bg-red-700  text-sm hover:bg-red-900"
          onClick={handleDelete}
        >
          Delete Item {itemIndex + 1}
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};
