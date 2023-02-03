import { useContext } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { InvoiceContext } from '@/context/InvoiceContext';
import { setInvoiceDates } from '@/hooks/setInvoiceDates';

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
    <div className="flex flex-col gap-2">
      <label htmlFor="paymentTerms" className="secondary-text">
        Payment Terms
      </label>

      <div className="relative cursor-pointer">
        <div
          className="primary-bg relative flex w-full items-baseline justify-between rounded-md pr-2 "
          onClick={onInputClick}
          aria-hidden="true"
        >
          <input
            type="text"
            readOnly
            value={state?.formData?.paymentTerms || ''}
          />

          {state.showPaymentTermOptions ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        <div
          className={`primary-bg absolute z-20 mt-1 w-full rounded-md  p-4 shadow-md ${
            state.showPaymentTermOptions ? 'flex flex-col gap-4' : 'hidden'
          }`}
        >
          <option
            onClick={() => onItemSelected('Cash')}
            className="secondary-bg flex cursor-pointer justify-center rounded-md py-2  px-4 "
          >
            Cash
          </option>
          <option
            onClick={() => onItemSelected('15 days from invoice date')}
            className="secondary-bg flex cursor-pointer justify-center rounded-md py-2  px-4 "
          >
            15 days from invoice date
          </option>
          <option
            onClick={() => onItemSelected('21 days from invoice date')}
            className="secondary-bg flex cursor-pointer justify-center rounded-md py-2  px-4 "
          >
            21 days from invoice date
          </option>
        </div>
      </div>
    </div>
  );
}

export default SelectPaymentTerms;
