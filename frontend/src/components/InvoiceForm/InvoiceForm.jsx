import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect/';

import { getInvoice } from '@/hooks/useInvoicesApi';
import { Button } from '@components/Button';
import { updateInvoice } from '@hooks/useInvoicesApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

  const getInvoiceData = (invoiceId) =>
    useQuery({
      queryKey: ['filteredInvoice', invoiceId],
      queryFn: () => getInvoice(invoiceId),
      staleTime: 1000,
    });

  const { data, isLoading, isError, error } = getInvoiceData(invoiceId);

  const [invoiceData, setInvoiceData] = useState(data);

  useEffect(() => {
    setInvoiceData({
      id: data?.id,
      senderCity: data?.senderAddress?.city,
      senderStreet: data?.senderAddress?.street,
      senderPostCode: data?.senderAddress?.postCode,
      senderCountry: data?.senderAddress?.country,
      clientEmail: data?.clientEmail,
      clientName: data?.clientName,
      clientCity: data?.clientAddress?.city,
      clientStreet: data?.clientAddress?.street,
      clientCountry: data?.clientAddress?.country,
      clientPostCode: data?.clientAddress?.postCode,
      description: data?.description,
      invoiceDate: data?.createdAt,
      createdAt: data?.createdAt,
      paymentDue: data?.paymentDue,
      paymentTerms: data?.paymentTerms,
      status: data?.status,
      amountDueTotal: data?.total,
      items: data?.items,
    });
    return () => {};
  }, [data]);

  const [amountDue, setAmountDue] = useState(data?.total);

  // update invoice on db with invoiceData
  const updateInvoiceMutation = useMutation(
    () => updateInvoice(invoiceId, invoiceData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('invoices');
      },
    }
  );

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
  }, [invoiceData?.amountDue, amountDue]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateInvoiceMutation.mutate({ ...invoiceData });
    setShowForm((prev) => !prev);
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={styles.invoiceForm}>
      <h2>
        Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
        {invoiceId}
      </h2>

      <form
        className={styles.form}
        onSubmit={handleFormSubmit}
        disabled={isLoading}>
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
            itemLabel='Post Code'
            value={invoiceData.senderPostCode || ''}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='senderCountry'
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
