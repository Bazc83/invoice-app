import { FormItemInput } from "@/ui/FormItemInput";
import { useEffect, useReducer } from "react";
import { useFormItemReducer } from "./useFormItemReducer";

export const FormItem = ({
  item,
  onItemSave,
  handleDeleteItem,
  itemIndex,
}) => {
  const { itemReducer } = useFormItemReducer();

  const initialValue = {
    itemId: item?.id,
    name: item?.name,
    quantity: item?.quantity,
    price: item?.price,
    total: item?.total,
  };
  const [state, dispatch] = useReducer(itemReducer, {
    formItem: { ...initialValue },
  });

  // state de-structured
  const { formItem } = state;

  const handleDelete = (itemId, e) => {
    e.preventDefault();
    handleDeleteItem(itemId);
  };


  useEffect(() => {
    dispatch({ type: "itemTotal" });
  }, [formItem.price, formItem.quantity]);

  useEffect(() => {
    dispatch({ type: "itemId", payload: { itemId: item.itemId } });
  }, [item.itemId]);

  return (
    <div className="flex flex-col gap-4 ">
      <h2>Item {itemIndex + 1}</h2>
      <div className="grid grid-cols-6 grid-rows-2 gap-2">
        {/* Item Name */}
        <FormItemInput className={"col-span-full col-start-1 row-start-1 "}>
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            value={formItem?.name}
            onChange={(e) =>
              dispatch({ type: "itemName", payload: { value: e.target.value } })
            }
          />
        </FormItemInput>

        {/* Item Quantity */}
        <FormItemInput
          className={"col-span-2 col-start-1 row-start-2  text-center"}
        >
          <label htmlFor="quantity">Qty</label>
          <input
            type="number"
            name="quantity"
            value={formItem?.quantity}
            onChange={(e) =>
              dispatch({
                type: "itemQuantity",
                payload: { value: e.target.value },
              })
            }
            min={1}
            max={100}
            step={1}
            onBlur={(e) =>
              dispatch({
                type: "validateQuantity",
                payload: { value: +e.target.value },
              })
            }
            className="text-center"
          />
        </FormItemInput>

        {/* Item Price */}
        <FormItemInput
          className={"col-span-2 col-start-3 row-start-2 text-center "}
        >
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formItem?.price}
            onChange={(e) =>
              dispatch({
                type: "itemPrice",
                payload: { value: e.target.value },
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "validatePrice",
                payload: { value: e.target.value },
              })
            }
            className="text-center"
          />
        </FormItemInput>

        {/* Item Total **input disabled*** just to show value */}
        <FormItemInput
          className={"col-span-2 col-start-5 row-start-2 text-center"}
        >
          <label htmlFor="total">Total</label>
          <input
            type="number"
            name="total"
            value={formItem?.total.toFixed(2)}
            disabled={true}
            className="text-center"
          />
        </FormItemInput>

        <button
          type="button"
          onClick={() => onItemSave(state.formItem)}
          className=" btn  col-span-3 col-start-1 row-start-3 flex items-center justify-center  gap-2 bg-emerald-700 text-sm hover:bg-emerald-900"
        >
          Save
        </button>
        <button
          type="button"
          className=" btn text- col-span-3 col-start-4 flex items-center  justify-center gap-2 bg-red-700 hover:bg-red-900"
          onClick={(e) => handleDelete(item.itemId, e)}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};
