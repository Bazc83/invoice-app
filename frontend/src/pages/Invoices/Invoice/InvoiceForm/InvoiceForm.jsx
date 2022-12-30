import { Button } from '@components/Button';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getInvoice, updateInvoice, updateItem } from '@hooks/useInvoicesApi';

import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';
import { InvoiceItems } from './InvoiceItems';

export const InvoiceForm = ({ setShowForm, invoiceId }) => {
  const {
    isLoading,
    isError,
    error,
    data: invoice,
  } = useQuery(['invoice'], () => getInvoice(invoiceId));

  const queryClient = useQueryClient();
  const senderAddress = {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  };

  const { street, city, postCode, country } = senderAddress;

  const [formData, setFormData] = useState({
    street: street,
    city: city,
    postCode: postCode,
    country: country,
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
    total: invoice?.total,
    items: invoice?.items,
  });

  const {
    clientEmail,
    clientName,
    description,
    id,
    paymentDue,
    paymentTerms,
    status,
    total,
    clientCity,
    clientStreet,
    clientPostCode,
    clientCountry,
    invoiceDate,
    createdAt,
    items,
  } = formData;

  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [selectedOption, setSelectedOption] = useState(1);

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const updateMutation = useMutation(() => updateInvoice(invoiceId, formData), {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries('invoices');
    },
  });

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  const inputOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const invoiceData = {
    city,
    street,
    postCode,
    country,
    clientEmail,
    clientName,
    clientCity,
    clientCountry,
    clientPostCode,
    clientStreet,
    description,
    id,
    paymentDue,
    paymentTerms,
    status,
    total,
    invoiceDate,
    createdAt,
    items,
  };

  const [itemsArray, setItemsArray] = useState([...invoice?.items]);

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

  useEffect(() => {
    setFormData((prev) => ({ ...prev, items: [...itemsArray] }));
  }, [itemsArray]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    updateMutation.mutate({ ...formData });
    setShowForm((prev) => !prev);
  };

  return (
    <div className={styles.invoiceForm}>
      <h2>
        Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
        {invoice?.id}
      </h2>

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formSection}>
          <InvoiceFormInput
            itemName='id'
            itemLabel='invoice id'
            value={id}
            setValue={inputOnChange}
          />
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            itemName='streetAddress'
            itemLabel='Street Address'
            value={street}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='city'
            itemLabel='City'
            value={city}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='postCode'
            itemLabel='Post Code'
            value={postCode}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='country'
            value={country}
            setValue={inputOnChange}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            itemName='clientName'
            itemLabel="Client's Name"
            value={clientName}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientEmail'
            itemLabel="Client's Email"
            value={clientEmail}
            setValue={inputOnChange}
          />

          <InvoiceFormInput
            itemName='clientStreet'
            itemLabel='Street Address'
            value={clientStreet}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCity'
            itemLabel='City'
            value={clientCity}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientPostCode'
            itemLabel='Post Code'
            value={clientPostCode}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            itemName='clientCountry'
            itemLabel='Country'
            value={clientCountry}
            setValue={inputOnChange}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='createdAt'
              itemLabel='Created at'
              value={createdAt}
              setValue={inputOnChange}
            />

            {/* // todo tempory as needs to be created at plus days to payment terms date */}
            <InvoiceFormInput
              type='date'
              itemName='paymentDue'
              itemLabel='Payment Due'
              value={paymentDue}
              setValue={inputOnChange}
            />

            <InvoiceFormSelect
              options={options}
              selectedKey={selectedOption}
              placeholder={'type to search'}
              onChange={(item) => setSelectedOption(item)}
              showOptionsMenu={showOptionsMenu}
              setShowOptionsMenu={setShowOptionsMenu}
            />
          </div>
          <InvoiceFormInput
            itemName='description'
            itemLabel='Project/Description'
            value={invoice.description}
            setValue={inputOnChange}
          />
        </div>

        <InvoiceItems
          items={invoice?.items}
          invoiceId={invoiceId}
          onItemsChange={onItemsChange}
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
