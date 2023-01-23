import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { SelectPaymentTerms } from '@/components/SelectPaymentTerms';
import { InvoiceContext } from '@/context/InvoiceContext';
import { Button } from '@components/Button';
import { useContext } from 'react';
import styles from './InvoiceForm.module.css';

export const InvoiceForm = ({
  itemsArray,
  setItemsArray,
  handleFormSubmit,
  handleCancel,
}) => {
  const { state, dispatch } = useContext(InvoiceContext);

  // Update formdata when form values change
  const inputOnChange = (e) => {
    dispatch({ type: 'changeFormData', payload: e });
  };

  return (
    <div className={styles.invoiceForm}>
      <FormId state={state} />

      <form className={styles.form}>
        <FormMainContent inputOnChange={inputOnChange} state={state} />

        <FormItems itemsArray={itemsArray} setItemsArray={setItemsArray} />

        <FormButtons
          handleCancel={handleCancel}
          handleFormSubmit={handleFormSubmit}
        />
      </form>
    </div>
  );
};

function FormMainContent({ inputOnChange, state }) {
  return (
    <>
      <div className={styles.formSection}>
        <InvoiceFormInput
          itemName='id'
          itemLabel='invoice id'
          value={state.formData.id || ''}
          setValue={inputOnChange}
        />
        <h4 className={styles.formSectionHeader}>Bill From</h4>
        <InvoiceFormInput
          itemName='senderStreet'
          itemLabel='Street Address'
          value={state.formData.senderStreet || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='senderCity'
          itemLabel='City'
          value={state.formData.senderCity || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='senderPostCode'
          itemLabel='Postcode'
          value={state.formData.senderPostCode || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='senderCountry'
          itemLabel='Country'
          value={state.formData.senderCountry || ''}
          setValue={inputOnChange}
        />
      </div>

      <div className={styles.formSection}>
        <h4 className={styles.formSectionHeader}>Bill To</h4>
        <InvoiceFormInput
          itemName='clientName'
          itemLabel="Client's Name"
          value={state.formData.clientName || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          type='email'
          itemName='clientEmail'
          itemLabel="Client's Email"
          value={state.formData.clientEmail || ''}
          setValue={inputOnChange}
        />

        <InvoiceFormInput
          itemName='clientStreet'
          itemLabel='Street Address'
          value={state.formData.clientStreet || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='clientCity'
          itemLabel='City'
          value={state.formData.clientCity || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='clientPostCode'
          itemLabel='Post Code'
          value={state.formData.clientPostCode || ''}
          setValue={inputOnChange}
        />
        <InvoiceFormInput
          itemName='clientCountry'
          itemLabel='Country'
          value={state.formData.clientCountry || ''}
          setValue={inputOnChange}
        />

        <div className='grid-row-half'>
          <InvoiceFormInput
            type='date'
            itemName='createdAt'
            itemLabel='Created at'
            value={state.formData.createdAt || ''}
            disabled
          />

          <InvoiceFormInput
            type='date'
            itemName='paymentDue'
            itemLabel='Payment Due'
            value={state.formData.paymentDue || ''}
            disabled
          />

          {/* Select payment terms */}
          <SelectPaymentTerms />
        </div>

        <InvoiceFormInput
          itemName='description'
          itemLabel='Project/Description'
          value={state.formData.description || ''}
          setValue={inputOnChange}
        />
      </div>
    </>
  );
}

function FormButtons({ handleCancel, handleFormSubmit }) {
  return (
    <div className={styles.formButtons}>
      <Button onClick={handleCancel} btnStyle='btnThree'>
        Cancel
      </Button>
      <Button onClick={handleFormSubmit}>Save Changes</Button>
    </div>
  );
}

function FormId({ state }) {
  return (
    <h2>
      Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
      {state.formData?.id}
    </h2>
  );
}
