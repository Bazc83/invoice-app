import { FaTrashAlt } from 'react-icons/fa';

import TextInputWithValidation from './TextInputWithValidation';

function InvoiceFormItem({ item, index, register, remove, errors }) {
  const { quantity, price } = item;

  return (
    <div >
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Item name */}
        <TextInputWithValidation
          register={register}
          errors={errors}
          labelName="Item Name"
          inputName={`items[${index}].name`}
        />

        <div className="flex  flex-col xs:grid xs:grid-cols-[1fr_4fr_1fr]  items-center gap-2">
          {/* Item quantity */}
          <div className="flex flex-col gap-2 xs:w-auto  w-full ">
            <label htmlFor={`items[${index}].quantity`} >
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
              className="inputError xs:px-4 text-center xs:text-start"
            />
          </div>

          {/* Item price */}
          <div className="flex flex-col gap-2 w-full xs:w-auto">
            <label htmlFor={`items[${index}].price`} >
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
              className="inputError text-end w-full px-4"
            />
          </div>

          {/* Delete item button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="flex items-baseline w-full xs:w-auto justify-center pt-6 "
            // className="flex w-full items-end justify-center pb-3"
          >
            <FaTrashAlt className="text-2xl hover:text-skin-danger  " />
          </button>
        </div>
      </div>

      {/* items errors */}
      <div className="mt-2 flex flex-col  gap-1  text-center xs:text-start py-2">
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
