/* eslint-disable jsx-a11y/control-has-associated-label */
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

function Price({ control, index }) {
  const value = useWatch({
    control,
    name: `items[${index}]`,
    defaultValue: {},
  });

  return <span>Price: {(value.type || 0) * (value.amount || 0)}</span>;
}

function PriceTotal({ control }) {
  const value = useWatch({
    control,
    name: `items`,
    defaultValue: {},
  });

  console.log(value);
}

function DynamicFormTest() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  console.log('render');
  return (
    <form onSubmit={handleSubmit(console.log)} className="flex flex-col gap-2">
      {fields.map(({ id, name, type, amount }, index) => (
        <div key={id}>
          <input
            {...register(`items[${index}].name`)}
            name={`items[${index}].name`}
            placeholder="Name..."
            defaultValue={name}
          />

          <select
            id="select"
            {...register(`items[${index}].type`)}
            name={`items[${index}].type`}
            defaultValue={type}
          >
            <option value="">Select</option>
            <option value="10">Item A</option>
            <option value="20">Item B</option>
          </select>

          <input
            {...register(`items[${index}].amount`)}
            type="number"
            name={`items[${index}].amount`}
            placeholder="Amount..."
            defaultValue={amount}
          />
          <Price control={control} index={index} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <input type="submit" />
      <button type="button" onClick={() => append({})}>
        Append
      </button>

      <PriceTotal control={control} />
    </form>
  );
}

export default DynamicFormTest;
