import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect';
import { Button } from '@components/Button';
import { useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';

export const InvoiceForm = ({
  invoiceData,
  setFormData,
  handleFormSubmit,
  setShowInvoiceForm,
}) => {
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(
    invoiceData?.paymentTerms
  );

  const [showPaymentTermOptions, setShowPaymentTermOptions] = useState(false);
  const [amountDue, setAmountDue] = useState(invoiceData?.amountDueTotal);
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

  const onItemsChange = (itemsValue) => {
    setFormData((prev) => ({ ...prev, items: itemsValue }));
  };

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      amountDueTotal: amountDue,
    }));
  }, [amountDue, setFormData]);

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
        {invoiceData?.id}
      </h2>

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formSection}>
          <InvoiceFormInput
            itemName='id'
            itemLabel='invoice id'
            value={invoiceData.id || ''}
            setValue={inputOnChange}
          />
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            itemName='senderStreet'
            itemLabel='Street Address'
            value={invoiceData.senderStreet || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderCity'
            itemLabel='City'
            value={invoiceData.senderCity || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderPostCode'
            itemLabel='Postcode'
            value={invoiceData.senderPostCode || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderCountry'
            itemLabel='Country'
            value={invoiceData.senderCountry || ''}
            setValue={inputOnChange}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            itemName='clientName'
            itemLabel="Client's Name"
            value={invoiceData.clientName || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientEmail'
            itemLabel="Client's Email"
            value={invoiceData.clientEmail || ''}
            setValue={inputOnChange}
          />

          <InvoiceFormInput
            itemName='clientStreet'
            itemLabel='Street Address'
            value={invoiceData.clientStreet || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCity'
            itemLabel='City'
            value={invoiceData.clientCity || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientPostCode'
            itemLabel='Post Code'
            value={invoiceData.clientPostCode || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCountry'
            itemLabel='Country'
            value={invoiceData.clientCountry || ''}
            setValue={inputOnChange}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='createdAt'
              itemLabel='Created at'
              value={invoiceData.createdAt || ''}
              setValue={inputOnChange}
            />

            {/* // todo tempory as needs to be created at plus days to payment terms date */}
            <InvoiceFormInput
              type='date'
              itemName='paymentDue'
              itemLabel='Payment Due'
              value={invoiceData.paymentDue || ''}
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
            value={invoiceData.description || ''}
            setValue={inputOnChange}
          />
        </div>

        <FormItems
          invoiceData={invoiceData}
          setFormData={setFormData}
          onItemsChange={onItemsChange}
          setAmountDue={setAmountDue}
        />

        <div className={styles.formButtons}>
          <Button
            onClick={() => setShowInvoiceForm((prev) => !prev)}
            btnStyle='btnThree'>
            Cancel
          </Button>
          <Button type='submit'>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
