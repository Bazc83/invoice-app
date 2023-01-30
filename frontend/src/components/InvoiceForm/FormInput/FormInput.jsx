import { useEffect, useState } from "react";

export const FormInput = ({
  type,
  itemName,
  itemLabel,
  disabled,
  className,
  value,
  setValue,
  min,
  max,
  onBlur,
  required,
  step,
}) => {
  const [itemValue, setItemValue] = useState(value);

  const handleChange = (e) => {
    setItemValue(e.target.value);
    setValue(e);
  };

  useEffect(() => {
    setItemValue(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-2    ${className ? className : ""}`}>
      <label htmlFor={itemName} className="secondary-text ">
        {itemLabel}
      </label>
      <input
        min={min}
        max={max}
        onBlur={onBlur}
        type={type ? type : "text"}
        name={itemName}
        className={"primary-bg rounded-md border py-2 px-4"}
        value={itemValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        step={step}
      />
    </div>
  );
};
