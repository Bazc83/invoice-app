import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect/';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';
import { InvoiceContext } from '@/pages/Invoice';
import { Button } from '@components/Button';
import { useContext, useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';
export const InvoiceForm = ({ setShowForm, invoiceId }) => {
  const [showPaymentTermsOptions, setShowPaymentTermsOptions] = useState(false);

  const paymentOptions = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);

  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(1);

  const [amountDue, setAmountDue] = useState(invoiceData?.amountDueTotal);

  // Update Invoice
  const { updateInvoiceMutation } = useUpdateInvoice(invoiceId, invoiceData);

  // Update formdata when form values change
  const inputOnChange = (e) => {
    setInvoiceData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onItemsChange = (itemsValue) => {
    setInvoiceData((prev) => ({ ...prev, items: [...itemsValue] }));
  };

  useEffect(() => {
    setInvoiceData((prevState) => ({
      ...prevState,
      amountDueTotal: amountDue,
    }));
  }, [amountDue, setInvoiceData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData },
    });
    setShowForm((prev) => !prev);
  };

  return (
    <div className={styles.invoiceForm}>
      <h2>
        Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
        {invoiceId}
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
              options={paymentOptions}
              selectedKey={selectedPaymentTerm}
              placeholder={'type to search'}
              onChange={(item) => setSelectedPaymentTerm(item)}
              showPaymentTermsOptions={showPaymentTermsOptions}
              setShowPaymentTermsOptions={setShowPaymentTermsOptions}
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
          items={invoiceData.items}
          invoiceId={invoiceId}
          onItemsChange={onItemsChange}
          setAmountDue={setAmountDue}
        />

        <div className={styles.formButtons}>
          <Button
            onClick={() => setShowForm((prev) => !prev)}
            btnStyle='btnThree'>
            Cancel
          </Button>
          <Button type='submit'>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
