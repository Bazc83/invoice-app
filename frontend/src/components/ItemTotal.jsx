import { useWatch } from 'react-hook-form';

function ItemTotal({ control, index, register }) {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  return (
    <div className='flex flex-col gap-3'>
      <label htmlFor={`items[${index}].total`} >Total</label>
      <input
        type="number"
        value={(+value.price || 0) * (+value.quantity || 0)}
        {...register(`items[${index}].total`)}
        
      />

      
    </div>
  );
}
export default ItemTotal;
