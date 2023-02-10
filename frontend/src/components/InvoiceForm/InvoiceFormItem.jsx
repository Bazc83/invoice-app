import { useEffect, useState } from 'react';
import { useWatch} from 'react-hook-form';
import { FaTrashAlt } from 'react-icons/fa';

function InvoiceFormItem({ item, index, register, remove, control }) {
  const { name, quantity, price, total } = item;

  const [itemTotal, setItemTotal] = useState();

  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  useEffect(() => {
    setItemTotal((+value.price || 0) * (+value.quantity || 0))
  }, [value]);

  useEffect(()=>{console.log(itemTotal)},[itemTotal])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor={`items[${index}].name`}>Item Name</label>
        <input
          {...register(`items[${index}].name`)}
          type="text"
          id="itemName"
          defaultValue={name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`items[${index}].quantity`}>Quantity</label>
        <input
          {...register(`items[${index}].quantity`, {valueAsNumber: true})}
          type="number"
          id="quantity"
          defaultValue={quantity}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={`items[${index}].price`}>Price</label>
        <input
          {...register(`items[${index}].price`, {valueAsNumber: true})}
          step="any"
          type="number"
          id="price"
          defaultValue={price}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor={`items[${index}].total`}>Total</label>
        <input
          type="number"
          value={itemTotal}
          disabled
        />
      </div>

     
      <button type="button" onClick={() => remove(index)}>
        <FaTrashAlt />
      </button>
    </div>
  );
}
export default InvoiceFormItem;
