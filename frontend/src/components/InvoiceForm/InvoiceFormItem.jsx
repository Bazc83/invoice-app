import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

function InvoiceFormItem({ item, index, register, remove, control }) {
  const { name, quantity, price } = item;

  const [itemTotal, setItemTotal] = useState();

  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  useEffect(() => {
    setItemTotal((+value.price || 0) * (+value.quantity || 0));
  }, [value.price, value.quantity]);

  return (
    <div className="flex flex-col gap-4 md:flex-row  ">
      {/* Item name */}
      <div className="flex w-full flex-col gap-2 md:w-full">
        <label htmlFor={`items[${index}].name`}>Item Name</label>

        <input
          {...register(`items[${index}].name`, { required: true })}
          type="text"
          id="itemName"
          defaultValue={name}
        />
      </div>

      <div className="grid grid-cols-[2fr_3fr_3fr_1fr] gap-2 md:gap-2">
        {/* Item quantity */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor={`items[${index}].quantity`} className="text-center">
            Qty
          </label>
          <input
            {...register(`items[${index}].quantity`, {
              valueAsNumber: true,
              required: true,
            })}
            type="number"
            id="quantity"
            defaultValue={quantity}
            className="text-center"
          />
        </div>

        {/* Item price */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor={`items[${index}].price`} className="text-center">
            Price
          </label>
          <input
            {...register(`items[${index}].price`, {
              valueAsNumber: true,
              required: true,
            })}
            step="any"
            type="number"
            id="price"
            defaultValue={price}
            className="text-center"
          />
        </div>

        {/* Item total value */}
        <div className="flex flex-col gap-2 ">
          <label htmlFor={`items[${index}].total`} className="text-center">
            Total
          </label>
          <div
            id={`items[${index}].total`}
            className="rounded-md   border border-gray-200 bg-gray-200 py-2 text-center text-gray-500 dark:border-gray-400 dark:bg-gray-800"
          >
            {itemTotal}
          </div>
        </div>

        {/* Delete item button */}
        <button
          type="button"
          onClick={() => remove(index)}
          className="flex w-full items-end justify-center pb-3 "
        >
          <FaTrashAlt className="text-xl hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}
export default InvoiceFormItem;
