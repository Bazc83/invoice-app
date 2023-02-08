import { toast } from 'react-toastify';

import { FormItemInput } from '@/components/FormItemInput';
import useNewInvoiceStore from '@/context/useNewInvoiceStore';

function ItemFormTemplate({ setNewForm, newForm, item }) {
  const updateItem = useNewInvoiceStore((s) => s.updateItem);

  // const initialValue = {
  //   formItem: {
  //     itemId: newForm ? newId : item?.id,
  //     name: newForm ? '' : item?.name,
  //     quantity: newForm ? 1 : item?.quantity,
  //     price: newForm ? 0.01 : item?.price,
  //     total: newForm ? 0.01 : item?.total,
  //   },
  // };

  const handleSaveItem = (formItemValue) => {
    // toast.success('Item updated', { className: 'mx-4 md:mx-0 top-5 md:top-0' });
    setTimeout(() => {
      updateItem(formItemValue);
    }, 1000);
  };

  const handleDeleteItem = (itemId) => {
    toast.warning('Item Deleted', { className: 'mx-4 md:mx-0 top-5 md:top-0' });
    setTimeout(() => {
      console.log('delete item, ', itemId);
    }, 1000);
  };

  const handleCancelAddNewItem = () => {
    toast.warning('Cancelling add item', {
      className: 'mx-4 md:mx-0 top-5 md:top-0',
    });

    setTimeout(() => {
      setNewForm(false);
    }, 1000);
  };

  // useEffect(() => {
  //   if (!item) return;
  //   dispatch({ type: 'itemId', payload: { itemId: item.itemId } });
  // }, [item?.itemId, item]);

  return (
    <div className="relative ">
      <div className="secondary-bg relative grid  grid-cols-6  gap-y-6 gap-x-2 rounded-md text-sm  ">
        {/* Item Name */}
        <FormItemInput className="col-span-full col-start-1  ">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            value={item?.name}
            onChange={(e) => console.log(e.target.value)}
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
            value={item.quantity}
            onChange={(e) => console.log(e.target.value)}
            min={1}
            step={1}
            // onBlur={(e) => handleQuantityOnBlur(state.formItem, e)}
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
            value={item.price}
            onChange={(e) => console.log(e.target.value)}
            // onBlur={(e) => handlePriceOnBlur(state.formItem, e)}
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
            value={item.total.toFixed(2)}
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

          {newForm && (
            <button
              type="button"
              onClick={handleSaveItem}
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
