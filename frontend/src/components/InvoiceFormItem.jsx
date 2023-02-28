import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

import TextInputWithValidation from './TextInputWithValidation';

function InvoiceFormItem({ item, index, register, remove, control, errors }) {
  const { quantity, price } = item;

  const [itemTotal, setItemTotal] = useState();

  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  useEffect(() => {
    setItemTotal(
      parseFloat((+value.price || 0) * (+value.quantity || 0)).toFixed(2)
    );
  }, [value.price, value.quantity]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row  ">
        {/* Item name */}
        <TextInputWithValidation
          register={register}
          errors={errors}
          labelName="Item Name"
          inputName={`items[${index}].name`}
        />

        <div className="grid grid-cols-[2fr_3fr_3fr_1fr] gap-2 md:gap-2">
          {/* Item quantity */}
          <div className="flex flex-col gap-3 ">
            <label htmlFor={`items[${index}].quantity`} className="text-center">
              Qty
            </label>
            <input
              {...register(`items[${index}].quantity`, {
                valueAsNumber: true,
                min: { value: 1, message: 'Quantity needs to be 1 or more' },
                max: {
                  value: 100,
                  message: 'Maximum quantity for this item is 100',
                },
                required: { value: true, message: 'Quantity is required' },
              })}
              aria-invalid={
                errors?.items && errors?.items?.[index]?.quantity?.type
                  ? 'true'
                  : 'false'
              }
              min="1"
              max="100"
              type="number"
              id="quantity"
              defaultValue={quantity || 1}
              className="inputError text-center"
            />
          </div>

          {/* Item price */}
          <div className="flex flex-col gap-3">
            <label htmlFor={`items[${index}].price`} className="text-center">
              Price
            </label>
            <input
              aria-invalid={
                errors?.items &&
                errors?.items?.[index]?.price?.type === 'required'
                  ? 'true'
                  : 'false'
              }
              {...register(`items[${index}].price`, {
                required: { value: true, message: 'Price is required' },
                pattern: {
                  value: /^[0-9]+\.[0-9]{2}$/,
                  message: 'Invalid price',
                },
              })}
              inputMode="numeric"
              type="text"
              id="price"
              defaultValue={price || '0.00'}
              className="inputError text-center"
            />
          </div>

          {/* Item total value */}
          <div className="flex flex-col gap-3 ">
            <label htmlFor={`items[${index}].total`} className="text-center">
              Total
            </label>
            <div
              id={`items[${index}].total`}
              className="rounded-md  border border-skin-fill bg-skin-fill py-2 text-center text-skin-muted relative after:absolute after:bg-black/40 after:rounded-md after:inset-0 after:w-full after:h-full"
            >
              {itemTotal || '0.00'}
            </div>
          </div>

          {/* Delete item button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="flex w-full items-end justify-center pb-3"
          >
            <FaTrashAlt className="text-xl hover:text-skin-danger " />
          </button>
        </div>
      </div>

      {/* items errors */}
      <div className="mt-2 flex flex-col gap-1  py-1">
        {errors?.items?.[index] &&
          Object.keys(errors?.items?.[index]).map((itemVal) => (
            <span
              key={itemVal}
              className="relative  text-sm text-red-600 aria-[invalid=true]:visible aria-[invalid=false]:invisible"
              role="alert"
            >
              {errors?.items?.[index]?.[itemVal]?.message}
            </span>
          ))}
      </div>
    </div>
  );
}
export default InvoiceFormItem;
