import { useContext } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { InvoiceContext } from '@/context/InvoiceContext';
import { setInvoiceDates } from '@/hooks/setInvoiceDates';

import styles from './SelectPaymentTerms.module.css';

export function SelectPaymentTerms() {
  const { state, dispatch } = useContext(InvoiceContext);

  const onItemSelected = (option) => {
    dispatch({
      type: 'setPaymentTermsAndPaymentDueDate',
      payload: {
        paymentTerms: option,
        paymentDue: setInvoiceDates({
          paymentTermsValue: option,
          createdAtDate: state.formData.createdAt,
        }),
      },
    });
  };

  const onInputClick = () => {
    dispatch({ type: 'toggleShowPaymentTermOptions' });
  };

  if (state.formData === undefined) return 'Loading...';

  return (
    <div className={styles.SelectPaymentTerms}>
      <label htmlFor="paymentTerms" className="text-faded">
        Payment Terms
      </label>

      <div className={styles.dropdownContainer}>
        <div
          className={styles.inputContainer}
          onClick={onInputClick}
          aria-hidden="true"
        >
          <input
            type="text"
            readOnly
            value={state.formData.paymentTerms || ''}
            className="text"
          />

          {state.showPaymentTermOptions ? (
            <FaChevronUp className={styles.icon} />
          ) : (
            <FaChevronDown className={styles.icon} />
          )}
        </div>

        <div
          className={`${styles.dropdown} ${
            state.showPaymentTermOptions && styles.visible
          }`}
        >
          <button
            type="button"
            onClick={() => onItemSelected('Cash')}
            className={`${styles.option} text`}
          >
            Cash
          </button>
          <button
            type="button"
            onClick={() => onItemSelected('15 days from invoice date')}
            className={`${styles.option} text`}
          >
            15 days from invoice date
          </button>
          <button
            type="button"
            onClick={() => onItemSelected('21 days from invoice date')}
            className={`${styles.option} text`}
          >
            21 days from invoice date
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectPaymentTerms;
