import { FormItems } from '@/components/FormItems';
import { InvoiceFormInput } from '@/components/InvoiceFormInput';
import { InvoiceFormSelect } from '@/components/InvoiceFormSelect/';
import { useAddNewInvoice } from '@/hooks/reactQueryHooks/useAddNewInvoice';
import { useUpdateInvoiceId } from '@/hooks/reactQueryHooks/useUpdateInvoiceId';
import { Button } from '@components/Button';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './NewInvoiceForm.module.css';

export const NewInvoiceForm = ({ setShowInvoiceForm }) => {
  const [showPaymentTermOptions, setShowPaymentTermOptions] = useState(false);

  const paymentOptions = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(1);

  const [amountDue, setAmountDue] = useState(0);

  const useInvoiceId = () =>
    useQuery({
      queryKey: ['invoiceId'],
      queryFn: async () => {
        const response = await axios.get('/api/invoiceId');
        return response.data[0].invoiceId;
      },
    });

  const { data: invoiceId, isLoading, isError, error } = useInvoiceId();

  const [invoiceData, setInvoiceData] = useState({
    id: invoiceId,
    senderCity: '',
    senderStreet: '',
    senderPostCode: '',
    senderCountry: '',
    clientEmail: '',
    clientName: '',
    clientCity: '',
    clientStreet: '',
    clientCountry: '',
    clientPostCode: '',
    description: '',
    invoiceDate: '',
    createdAt: '',
    paymentDue: '',
    paymentTerms: selectedPaymentTerm,
    status: 'draft',
    amountDueTotal: amountDue,
    items: [],
  });

  // Set Invoice id from saved value in db
  useEffect(() => {
    setInvoiceData((prev) => ({ ...prev, id: invoiceId }));
  }, [isLoading, invoiceId]);

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

  // update amountDue to invoiceData
  useEffect(() => {
    setInvoiceData((prevState) => ({
      ...prevState,
      amountDueTotal: amountDue,
    }));
  }, [amountDue, setInvoiceData]);

  // add new Invoice
  const { newInvoiceMutation } = useAddNewInvoice(invoiceData);

  // update invoiceId
  const { updateIdMutation } = useUpdateInvoiceId();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    newInvoiceMutation.mutate({
      invoiceId: invoiceId,
      invoiceData: { ...invoiceData },
    });
    // increase invoice id by one
    updateIdMutation.mutate();

    setShowInvoiceForm((prev) => !prev);
  };

  if (isLoading) return 'Loading....';
  if (isError) return `An error has occurred ${error}`;

  if (!isLoading)
    return (
      <div className={styles.invoiceForm}>
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {invoiceData?.id}
        </h2>

        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.formSection}>
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
            items={invoiceData.items}
            invoiceId={invoiceData?.id}
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
