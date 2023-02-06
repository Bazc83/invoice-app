import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

import { FormItemInput } from '@/components/FormItemInput';

import itemReducer from '../EditFormItem/itemReducer';

function ItemFormTemplate({
  item,
  newForm,
  onItemSave,
  handleDelete,
  addItem,
  setShowNewItemInput,
}) {
  const newId = uuidv4();

  const newFormInitialValue = {
    formItem: {
      itemId: newId,
      name: '',
      quantity: 1,
      price: 0.01,
      total: 0.0,
    },
  };

  const initialValue = {
    formItem: {
      itemId: item?.id,
      name: item?.name,
      quantity: item?.quantity,
      price: item?.price,
      total: item?.total,
    },
  };

  const [state, dispatch] = useReducer(
    itemReducer,
    newForm ? newFormInitialValue : initialValue
  );

  const handleSaveItem = (formItemValue) => {
    // toast.success('Item updated', { className: 'mx-4 md:mx-0 top-5 md:top-0' });

    setTimeout(() => {
      onItemSave(formItemValue);
    }, 1000);
  };

  const handleDeleteItem = (itemId) => {
    toast.warning('Item Deleted', { className: 'mx-4 md:mx-0 top-5 md:top-0' });
    setTimeout(() => {
      handleDelete(itemId);
    }, 1000);
  };

  const handleAddItem = (itemValue) => {
    toast.success('Item added', { className: 'mx-4 md:mx-0 top-5 md:top-0' });

    setTimeout(() => {
      addItem(itemValue);

      setShowNewItemInput(false);
    }, 1000);
  };

  const handleCancelAddNewItem = () => {
    toast.warning('Cancelling add item', {
      className: 'mx-4 md:mx-0 top-5 md:top-0',
    });

    setTimeout(() => {
      setShowNewItemInput(false);
    }, 1000);
  };

  const handleQuantityOnBlur = (val, e) => {
    dispatch({
      type: 'validateQuantity',
      payload: { value: +e.target.value },
    });

    if (newForm) {
      handleAddItem(val);
    } else {
      handleSaveItem(val);
    }
  };
  const handleNameOnBlur = (val) => {
    if (newForm) {
      handleAddItem(val);
    } else {
      handleSaveItem(val);
    }
  };
  const handlePriceOnBlur = (val, e) => {
    dispatch({
      type: 'validatePrice',
      payload: { value: e.target.value },
    });

    if (newForm) {
      handleAddItem(val);
    } else {
      handleSaveItem(val);
    }
  };

  useEffect(() => {
    if (!item) return;
    dispatch({ type: 'itemId', payload: { itemId: item.itemId } });
  }, [item?.itemId, item]);

  return (
    <div className="relative ">
      <div className="secondary-bg relative grid  grid-cols-6  gap-y-6 gap-x-2 rounded-md text-sm  ">
        {/* Item Name */}
        <FormItemInput className="col-span-full col-start-1  ">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            value={state?.formItem?.name}
            onChange={(e) =>
              dispatch({
                type: 'itemName',
                payload: { value: e.target.value },
              })
            }
            onBlur={() => handleNameOnBlur(state.formItem)}
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
            value={+state.formItem.quantity}
            onChange={(e) =>
              dispatch({
                type: 'itemQuantity',
                payload: { value: e.target.value },
              })
            }
            min={1}
            step={1}
            onBlur={(e) => handleQuantityOnBlur(state.formItem, e)}
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
            value={state.formItem.price}
            onChange={(e) =>
              dispatch({
                type: 'itemPrice',
                payload: { value: e.target.value },
              })
            }
            onBlur={(e) => handlePriceOnBlur(state.formItem, e)}
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
            value={state.formItem.total.toFixed(2)}
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
              onClick={() => handleDeleteItem(state?.formItem?.itemId)}
            >
              Delete Item
            </button>
          )}

          {newForm && (
            <button
              type="button"
              onClick={() => handleAddItem(state.formItem)}
              className=" btn |  flex items-center justify-center  gap-2 bg-green-800  text-white hover:bg-green-900 "
            >
              Save new Item
            </button>
          )}

          {/* <button
            type="button"
            onClick={() => handleSaveItem(state?.formItem)}
            className=" btn | flex items-center justify-center  gap-2 bg-green-800  text-white hover:bg-green-900"
          >
            Update Item
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ItemFormTemplate;
