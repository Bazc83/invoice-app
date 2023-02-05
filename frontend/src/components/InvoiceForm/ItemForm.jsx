import { toast } from 'react-toastify';

import { FormItemInput } from '@/components/FormItemInput';

export function ItemForm({
  formItem,
  dispatch,
  handleSave,
  handleDelete,
  newForm,
  addItemToItemsArray,
  cancelAddNewItem,
}) {
  const handleAddItem = () => {
    toast.success('Item added', { className: 'mx-4 md:mx-0 top-5 md:top-0' });

    setTimeout(() => {
      addItemToItemsArray();
    }, 1000);
  };

  const handleSaveItem = () => {
    toast.success('Item updated', { className: 'mx-4 md:mx-0 top-5 md:top-0' });

    setTimeout(() => {
      handleSave(formItem);
    }, 1000);
  };

  const handleDeleteItem = (e) => {
    toast.warning('Item Deleted', { className: 'mx-4 md:mx-0 top-5 md:top-0' });

    setTimeout(() => {
      handleDelete(formItem.itemId, e);
    }, 1000);
  };

  const handleCancelAddNewItem = () => {
    toast.warning('Cancelling add item', {
      className: 'mx-4 md:mx-0 top-5 md:top-0',
    });

    setTimeout(() => {
      cancelAddNewItem();
    }, 1000);
  };

  return (
    <div className="relative ">
      <div className="secondary-bg relative grid  grid-cols-6  gap-y-6 gap-x-2 rounded-md   px-4 py-4 text-sm sm:px-6 ">
        {/* Item Name */}
        <FormItemInput className="col-span-full col-start-1  ">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            value={formItem?.name}
            onChange={(e) =>
              dispatch({
                type: 'itemName',
                payload: { value: e.target.value },
              })
            }
          />
        </FormItemInput>

        {/* Item Quantity */}
        <FormItemInput className="col-span-2 col-start-1  text-start ">
          <label className="text-center" htmlFor="quantity">
            Qty
          </label>
          <input
            type="number"
            name="quantity"
            value={formItem?.quantity}
            onChange={(e) =>
              dispatch({
                type: 'itemQuantity',
                payload: { value: e.target.value },
              })
            }
            min={1}
            step={1}
            onBlur={(e) =>
              dispatch({
                type: 'validateQuantity',
                payload: { value: +e.target.value },
              })
            }
            className="text-center"
          />
        </FormItemInput>

        {/* Item Price */}
        <FormItemInput className="col-span-2 col-start-3  text-start ">
          <label className="text-center" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formItem?.price}
            onChange={(e) =>
              dispatch({
                type: 'itemPrice',
                payload: { value: e.target.value },
              })
            }
            onBlur={(e) =>
              dispatch({
                type: 'validatePrice',
                payload: { value: e.target.value },
              })
            }
            className="text-center"
          />
        </FormItemInput>

        {/* Item Total **input disabled*** just to show value */}
        <FormItemInput className="col-span-2 col-start-5 text-start ">
          <label className="text-center" htmlFor="total">
            Total
          </label>
          <input
            type="number"
            name="total"
            value={formItem?.total.toFixed(2)}
            disabled
            className="text-center"
          />
        </FormItemInput>

        <div className="col-span-full flex w-full  justify-between md:justify-end md:gap-6">
          {newForm ? (
            <button
              onClick={handleCancelAddNewItem}
              type="button"
              className="btn | flex items-center  justify-center gap-2  bg-red-800 text-white hover:bg-red-900 "
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="btn | flex items-center  justify-center gap-2  bg-red-800 text-white hover:bg-red-900"
              onClick={handleDeleteItem}
            >
              Delete Item
            </button>
          )}

          {newForm ? (
            <button
              type="button"
              onClick={handleAddItem}
              className=" btn |  flex items-center justify-center  gap-2 bg-green-800  text-white hover:bg-green-900 "
            >
              Save new Item
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveItem}
              className=" btn | flex items-center justify-center  gap-2 bg-green-800  text-white hover:bg-green-900"
            >
              Update Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
