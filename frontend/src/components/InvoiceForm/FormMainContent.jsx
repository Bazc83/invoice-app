import { FormInput } from './FormInput';
import styles from './InvoiceForm.module.css';
import { SelectPaymentTerms } from './SelectPaymentTerms';

export function FormMainContent({ inputOnChange, state }) {
  return (
    <>
      <div className={styles.formSection}>
        <FormInput
          itemName='id'
          itemLabel='invoice id'
          value={state.formData.id || ''}
          setValue={inputOnChange}
        />
        <h4 className={styles.formSectionHeader}>Bill From</h4>
        <FormInput
          itemName='senderStreet'
          itemLabel='Street Address'
          value={state.formData.senderStreet || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='senderCity'
          itemLabel='City'
          value={state.formData.senderCity || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='senderPostCode'
          itemLabel='Postcode'
          value={state.formData.senderPostCode || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='senderCountry'
          itemLabel='Country'
          value={state.formData.senderCountry || ''}
          setValue={inputOnChange}
        />
      </div>

      <div className={styles.formSection}>
        <h4 className={styles.formSectionHeader}>Bill To</h4>
        <FormInput
          itemName='clientName'
          itemLabel="Client's Name"
          value={state.formData.clientName || ''}
          setValue={inputOnChange}
        />
        <FormInput
          type='email'
          itemName='clientEmail'
          itemLabel="Client's Email"
          value={state.formData.clientEmail || ''}
          setValue={inputOnChange}
        />

        <FormInput
          itemName='clientStreet'
          itemLabel='Street Address'
          value={state.formData.clientStreet || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='clientCity'
          itemLabel='City'
          value={state.formData.clientCity || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='clientPostCode'
          itemLabel='Post Code'
          value={state.formData.clientPostCode || ''}
          setValue={inputOnChange}
        />
        <FormInput
          itemName='clientCountry'
          itemLabel='Country'
          value={state.formData.clientCountry || ''}
          setValue={inputOnChange}
        />

        <div className='grid-row-half'>
          <FormInput
            type='date'
            itemName='createdAt'
            itemLabel='Created at'
            value={state.formData.createdAt || ''}
            disabled
          />

          <FormInput
            type='date'
            itemName='paymentDue'
            itemLabel='Payment Due'
            value={state.formData.paymentDue || ''}
            disabled
          />

          {/* Select payment terms */}
          <SelectPaymentTerms />
        </div>

        <FormInput
          itemName='description'
          itemLabel='Project/Description'
          value={state.formData.description || ''}
          setValue={inputOnChange}
        />
      </div>
    </>
  );
}
