import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './InvoiceFormSelect.module.css';
export const InvoiceFormSelect = ({
  options,
  placeholder = '',
  onChange,
  selectedKey,
  showPaymentTermOptions, setShowPaymentTermOptions
 
}) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option.key);
    onChange !== undefined && setInputValue(option.value);
    setShowPaymentTermOptions(false);
  };

  const onInputClick = () => {
    setShowPaymentTermOptions((prev) => !prev);
  };

  useEffect(() => {
    if (selectedKey) {
      setInputValue(options.find((o) => o.key === selectedKey).value);
    }
  }, [options, selectedKey]);

  return (
    <div className={styles.invoiceFormSelect}>
      <label htmlFor='paymentTerms' className='text-faded'>
        Payment Terms
      </label>

      <div className={styles.dropdownContainer}>
        <div className={styles.inputContainer} onClick={onInputClick}>
          <input type='text' readOnly value={inputValue} className='text' />

          {showPaymentTermOptions ? (
            <FaChevronUp className={styles.icon} />
          ) : (
            <FaChevronDown className={styles.icon} />
          )}
        </div>

        <div
          className={`${styles.dropdown} ${showPaymentTermOptions && styles.visible}`}>
          {options.map((option) => {
            return (
              <div
                key={option.key}
                onClick={() => onItemSelected(option)}
                className={`${styles.option} text`}>
                {option.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
