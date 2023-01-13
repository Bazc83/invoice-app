import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect';
import { Button } from '@components/Button';
import { useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';

export const InvoiceForm = ({
  formData,
  setFormData,
  itemsArray,
  setItemsArray,
  handleFormSubmit,
  setShowInvoiceForm,
}) => {
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(
    formData?.paymentTerms
  );

  const [showPaymentTermOptions, setShowPaymentTermOptions] = useState(false);

  const paymentOptions = [
    { key: '0', value: 'Cash' },
    { key: '15', value: '15 days End of Month' },
    { key: '21', value: '21 days End of Month' },
  ];

  // Update formdata when form values change
  const inputOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setShowInvoiceForm(false);
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      paymentTerms: selectedPaymentTerm,
    }));
  }, [selectedPaymentTerm, setFormData]);

  return (
    <div className={styles.invoiceForm}>
      <h2>
        Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
        {formData?.id}
      </h2>

      <form className={styles.form}>
        <div className={styles.formSection}>
          <InvoiceFormInput
            itemName='id'
            itemLabel='invoice id'
            value={formData.id || ''}
            setValue={inputOnChange}
          />
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            itemName='senderStreet'
            itemLabel='Street Address'
            value={formData.senderStreet || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderCity'
            itemLabel='City'
            value={formData.senderCity || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderPostCode'
            itemLabel='Postcode'
            value={formData.senderPostCode || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderCountry'
            itemLabel='Country'
            value={formData.senderCountry || ''}
            setValue={inputOnChange}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            itemName='clientName'
            itemLabel="Client's Name"
            value={formData.clientName || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientEmail'
            itemLabel="Client's Email"
            value={formData.clientEmail || ''}
            setValue={inputOnChange}
          />

          <InvoiceFormInput
            itemName='clientStreet'
            itemLabel='Street Address'
            value={formData.clientStreet || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCity'
            itemLabel='City'
            value={formData.clientCity || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientPostCode'
            itemLabel='Post Code'
            value={formData.clientPostCode || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCountry'
            itemLabel='Country'
            value={formData.clientCountry || ''}
            setValue={inputOnChange}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='createdAt'
              itemLabel='Created at'
              value={formData.createdAt || ''}
              setValue={inputOnChange}
            />

            {/* // todo tempory as needs to be created at plus days to payment terms date */}
            <InvoiceFormInput
              type='date'
              itemName='paymentDue'
              itemLabel='Payment Due'
              value={formData.paymentDue || ''}
              setValue={inputOnChange}
            />

            <InvoiceFormSelect
              paymentOptions={paymentOptions}
              selectedPaymentTerm={selectedPaymentTerm}
              placeholder={'type to search'}
              setSelectedPaymentTerm={setSelectedPaymentTerm}
              showPaymentTermOptions={showPaymentTermOptions}
              setShowPaymentTermOptions={setShowPaymentTermOptions}
            />
          </div>
          <InvoiceFormInput
            itemName='description'
            itemLabel='Project/Description'
            value={formData.description || ''}
            setValue={inputOnChange}
          />
        </div>

        <FormItems itemsArray={itemsArray} setItemsArray={setItemsArray} />

        <div className={styles.formButtons}>
          <Button onClick={handleCancelEdit} btnStyle='btnThree'>
            Cancel
          </Button>
          <Button onClick={handleFormSubmit}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
