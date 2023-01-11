import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './InvoiceFormSelect.module.css';
export const InvoiceFormSelect = ({
  paymentOptions,
  setSelectedPaymentTerm,
  selectedPaymentTerm,
  showPaymentTermOptions,
  setShowPaymentTermOptions,
}) => {
  const [inputValue, setInputValue] = useState('');

  const onItemSelected = (option) => {
    setSelectedPaymentTerm(option.key);
    setInputValue(option.value);
    setShowPaymentTermOptions(false);
  };

  const onInputClick = () => {
    setShowPaymentTermOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!paymentOptions) return;
    if (selectedPaymentTerm) {
      setInputValue(
        paymentOptions.find((o) => o.key === selectedPaymentTerm)?.value
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          className={`${styles.dropdown} ${
            showPaymentTermOptions && styles.visible
          }`}>
          {paymentOptions.map((option) => {
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
