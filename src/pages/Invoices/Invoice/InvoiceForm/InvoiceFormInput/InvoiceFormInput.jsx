import { useUpdateDocument } from '@hooks/useUpdateDocument';
import { useEffect, useState } from 'react';
import styles from './InvoiceFormInput.module.css';

export const InvoiceFormInput = ({
  type,
  className,
  itemName,
  itemLabel,
  inputError,
  maxWidth,
  disabled,
  noBg,
  value,
  setValue
}) => {
  const [itemValue, setItemValue] = useState(value);

  const { updateDocument } = useUpdateDocument();


  const handleChange = (e)=>{
    setItemValue(e.target.value);
    setValue(e.target.value)
  }


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
        type={type ? type : 'text'}
        name={itemName}
        className={`text`}
        value={itemValue}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
