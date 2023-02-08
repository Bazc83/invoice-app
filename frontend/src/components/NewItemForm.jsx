import { useEffect} from 'react';
import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

import { FormItemInput } from '@/components/FormItemInput';
import useNewInvoiceStore from '@/context/useNewInvoiceStore';
import useNewItemStore from '@/context/useNewItemStore';

function NewItemForm({ setNewForm }) {
  const itemData = useNewItemStore((s) => s.itemData);
  const priceError = useNewItemStore((s) => s.priceError);
  const quantityError = useNewItemStore((s) => s.quantityError);
  const nameError = useNewItemStore((s) => s.nameError);
  const updateName = useNewItemStore((s) => s.updateName);
  const updatePrice = useNewItemStore((s) => s.updatePrice);
  const validatePrice = useNewItemStore((s) => s.validatePrice);
  const validateQuantity = useNewItemStore((s) => s.validateQuantity);
  const validateName = useNewItemStore((s) => s.validateName);

  const updateQuantity = useNewItemStore((s) => s.updateQuantity);
  const updateItemId = useNewItemStore((s) => s.updateItemId);
  const setTotal = useNewItemStore((s) => s.setTotal);
  const resetItemData = useNewItemStore((s) => s.resetItemData);
  const addItem = useNewInvoiceStore((s) => s.addItem);

  const handleSaveItem = (itemVal) => {
    resetItemData();
    toast.success('New Item Added', {
      className: 'mx-4 md:mx-0 top-5 md:top-0',
    });
    setNewForm(false);
    addItem(itemVal);
  };

  const handleCancelAddNewItem = () => {
    resetItemData();
    setNewForm(false);
  };

  useEffect(() => {
    updateItemId(uuidv4());
  }, [updateItemId]);

  useEffect(() => {
    setTotal();
  }, [itemData.price, itemData.quantity, setTotal]);

  return (
    <div className="relative ">
      <div className="secondary-bg relative grid  grid-cols-6  gap-y-6 gap-x-2 rounded-md text-sm  ">
        {/* Item Name */}
        <FormItemInput className="relative col-span-full  col-start-1">
          <label htmlFor="name">Item Name</label>
          {nameError && (
            <small className="absolute top-[70px] left-2 text-red-500">
              Please enter an item name
            </small>
          )}

          <input
            type="text"
            name="name"
            value={itemData.name}
            onChange={(e) => updateName(e.target.value)}
            onBlur={(e) => validateName(e.target.value)}
            className={`border  ${nameError && 'border-red-600'} `}
            placeholder="Enter item name..."
          />
        </FormItemInput>

        {/* Item Quantity */}
        <FormItemInput className="relative col-span-2  col-start-1 text-start ">
          <label className="text-center" htmlFor="quantity">
            Qty
          </label>

          {quantityError && (
            <small className="absolute top-[70px] left-2 text-red-500">
              Minimum quantity 1
            </small>
          )}

          <input
            type="number"
            name="quantity"
            value={itemData.quantity}
            onChange={(e) => updateQuantity(e.target.value)}
            onBlur={(e) => validateQuantity(e.target.value)}
            min={1}
            step={1}
            className={`border text-center   ${
              quantityError && 'border-red-600'
            } `}
          />
        </FormItemInput>

        {/* Item Price */}
        <FormItemInput className="relative col-span-2  col-start-3 text-start">
          <label className="text-center" htmlFor="price">
            Price
          </label>

          {priceError && (
            <small className="absolute top-[70px] left-2 text-red-500">
              Minimum price 0.01
            </small>
          )}

          <input
            type="number"
            name="price"
            value={itemData.price}
            onChange={(e) => updatePrice(e.target.value)}
            onBlur={(e) => validatePrice(e.target.value)}
            className={`border text-center   ${
              priceError && 'border-red-600'
            } `}
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
            value={itemData.total.toFixed(2)}
            disabled
            className="text-center"
          />
        </FormItemInput>

        <div className="col-span-full flex w-full  justify-between md:justify-end md:gap-6">
          <button
            onClick={handleCancelAddNewItem}
            type="button"
            className="btn | flex items-center  justify-center gap-2  bg-red-800 text-white hover:bg-red-900 "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={priceError || quantityError || nameError}
            onClick={() => handleSaveItem(itemData)}
            className=" btn |  flex items-center justify-center  gap-2 bg-green-800  text-white hover:bg-green-900 "
          >
            Save new Item
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewItemForm;
