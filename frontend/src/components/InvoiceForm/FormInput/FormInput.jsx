import { useEffect, useState } from 'react';

import styles from './FormInput.module.css';

export const FormInput = ({
  type,
  className,
  itemName,
  itemLabel,
  inputError,
  maxWidth,
  disabled,
  noBg,
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
    <div
      className={`${styles.invoiceFormInput} ${
        inputError ? styles.inputError : ''
      }  ${maxWidth === 'max-content' ? styles.maxContent : ''} ${
        noBg ? styles.noBg : ''
      }  ${className ? className : ''}`}>
      <label htmlFor={itemName} className='text-faded'>
        {itemLabel}
      </label>
      <input
        min={min}
        max={max}
        onBlur={onBlur}
        type={type ? type : 'text'}
        name={itemName}
        className={`text`}
        value={itemValue}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        step={step}
      />
    </div>
  );
};