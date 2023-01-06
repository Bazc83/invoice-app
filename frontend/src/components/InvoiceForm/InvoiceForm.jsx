import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect/';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { Button } from '@components/Button';
import { updateInvoice } from '@hooks/useInvoicesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';

export const InvoiceForm = ({ setShowForm, invoiceId }) => {
  const [showPaymentTermsOptions, setShowPaymentTermsOptions] = useState(false);

  const queryClient = useQueryClient();

  const paymentOptions = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(1);

  // Fetch invoice data
  const {
    data: invoice,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const [amountDue, setAmountDue] = useState(invoice?.total);

  const [formData, setFormData] = useState({
    senderCity: invoice?.senderAddress?.city,
    senderStreet: invoice?.senderAddress?.street,
    senderPostCode: invoice?.senderAddress?.postCode,
    senderCountry: invoice?.senderAddress?.country,
    clientEmail: invoice?.clientEmail,
    clientName: invoice?.clientName,
    clientCity: invoice?.clientAddress?.city,
    clientStreet: invoice?.clientAddress?.street,
    clientCountry: invoice?.clientAddress?.country,
    clientPostCode: invoice?.clientAddress?.postCode,
    description: invoice?.description,
    invoiceDate: invoice?.createdAt,
    id: invoice?.id,
    createdAt: invoice?.createdAt,
    paymentDue: invoice?.paymentDue,
    paymentTerms: invoice?.paymentTerms,
    status: invoice?.status,
    amountDueTotal: amountDue,
    items: invoice?.items,
  });



  // update invoice on db with formData
  const updateInvoiceMutation = useMutation(
    () => updateInvoice(invoiceId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('invoices');
      },
    }
  );

  // Update formdata when form values change
  const inputOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Update items
  const [itemsArray, setItemsArray] = useState(invoice?.items);

  const onItemsChange = (itemValue) => {
    if (!itemValue) return;

    if (itemsArray.length === 0) {
      setItemsArray([itemValue]);
    } else {
      setItemsArray((prev) => [
        ...prev.filter((val) => val.itemId !== itemValue.itemId),
        itemValue,
      ]);
    }
  };

  // Update formdata when items values change
  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: [...itemsArray] }));
  }, [itemsArray]);

  // Calculate total amount due for invoice
  useEffect(() => {
    if (itemsArray.length === 1) {
      setAmountDue((prev) => (prev = itemsArray[0].total));
    } else {
      setAmountDue(
        (prev) =>
          (prev = formData.items
            .map((item) => +item.total)
            .reduce((acc, cur) => acc + cur, 0))
      );
    }
  }, [itemsArray, formData.items]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      amountDueTotal: amountDue,
    }));
  }, [amountDue]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({ ...formData });
    setShowForm((prev) => !prev);
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  if (invoice)
    return (
      <div className={styles.invoiceForm}>
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {invoice?.id}
        </h2>

        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          disabled={isLoading}>
          <div className={styles.formSection}>
            <InvoiceFormInput
              itemName='id'
              itemLabel='invoice id'
              value={formData.id}
              setValue={inputOnChange}
            />
            <h4 className={styles.formSectionHeader}>Bill From</h4>
            <InvoiceFormInput
              itemName='senderStreet'
              itemLabel='Street Address'
              value={formData.senderStreet}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='senderCity'
              itemLabel='City'
              value={formData.senderCity}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='senderPostCode'
              itemLabel='Post Code'
              value={formData.senderPostCode}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='senderCountry'
              value={formData.senderCountry}
              setValue={inputOnChange}
            />
          </div>

          <div className={styles.formSection}>
            <h4 className={styles.formSectionHeader}>Bill To</h4>
            <InvoiceFormInput
              itemName='clientName'
              itemLabel="Client's Name"
              value={formData.clientName}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              type='email'
              itemName='clientEmail'
              itemLabel="Client's Email"
              value={formData.clientEmail}
              setValue={inputOnChange}
            />

            <InvoiceFormInput
              itemName='clientStreet'
              itemLabel='Street Address'
              value={formData.clientStreet}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='clientCity'
              itemLabel='City'
              value={formData.clientCity}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='clientPostCode'
              itemLabel='Post Code'
              value={formData.clientPostCode}
              setValue={inputOnChange}
            />
            <InvoiceFormInput
              itemName='clientCountry'
              itemLabel='Country'
              value={formData.clientCountry}
              setValue={inputOnChange}
            />

            <div className='grid-row-half'>
              <InvoiceFormInput
                type='date'
                itemName='createdAt'
                itemLabel='Created at'
                value={formData.createdAt}
                setValue={inputOnChange}
              />

              {/* // todo tempory as needs to be created at plus days to payment terms date */}
              <InvoiceFormInput
                type='date'
                itemName='paymentDue'
                itemLabel='Payment Due'
                value={formData.paymentDue}
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
              value={formData.description}
              setValue={inputOnChange}
            />
          </div>

          <FormItems
            items={formData?.items}
            invoiceId={invoiceId}
            onItemsChange={onItemsChange}
            amountDueTotal={formData.amountDueTotal}
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
