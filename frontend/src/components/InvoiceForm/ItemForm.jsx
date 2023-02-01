import { FormItemInput } from "@/ui/FormItemInput";

export const ItemForm = ({
  formItem,
  dispatch,
  handleSave,
  handleDelete,
  newForm,
  addItemToItemsArray,
  handleCancelAddNewItem,
}) => {
  return (
    <div className="secondary-bg grid grid-cols-6  gap-y-4 gap-x-4 rounded-md  px-4 py-4 text-xs sm:gap-4  sm:px-6 sm:text-sm">
  
      {/* Item Name */}
      <FormItemInput className={"col-span-full col-start-1  "}>
        <label htmlFor="name">
          Item Name
        </label>
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
        className={"col-span-2 col-start-1  text-center"}
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
        className={"col-span-2 col-start-3  text-center "}
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
        className={"col-span-2 col-start-5 text-center"}
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

      <div className="col-span-full flex w-full  justify-between">
        {newForm ? (
          <button
            onClick={handleCancelAddNewItem}
            type="button"
            className=" btn | flex items-center justify-center  gap-2 bg-red-700 hover:bg-red-900 "
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2 border border-red-900 text-red-700 hover:bg-red-800 hover:text-white"
            onClick={(e) => handleDelete(formItem.itemId, e)}
          >
            Delete Item
          </button>
        )}

        {newForm ? (
          <button
            type="button"
            onClick={addItemToItemsArray}
            className=" btn |  flex items-center justify-center  gap-2 bg-emerald-700  hover:bg-emerald-900 "
          >
            ADD NEW
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleSave(formItem)}
            className=" btn | flex items-center justify-center  gap-2 bg-emerald-700 
             hover:bg-emerald-900 "
          >
            Update Item
          </button>
        )}
      </div>
    </div>
  );
};
