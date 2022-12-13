import { useUpdateDocument } from '@hooks/useUpdateDocument';
import { useEffect, useState } from 'react';
import styles from './InvoiceFormInput.module.css';

export const InvoiceFormInput = ({
  type,
  className,
  itemName,
  itemLabel,
  inputError,
  inputValue,
  maxWidth,
  disabled,
  noBg,
  parentId,
  handleChange,
}) => {
  const [itemValue, setItemValue] = useState(inputValue);

  const { updateDocument } = useUpdateDocument();

  useEffect(() => {
    setItemValue(inputValue);
  }, [inputValue]);

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
        onChange={(e) => setItemValue(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
