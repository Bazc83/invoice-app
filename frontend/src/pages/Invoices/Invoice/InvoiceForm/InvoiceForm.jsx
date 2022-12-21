import { Button } from '@components/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, reset } from '../../../../features/invoice/invoicesSlice';
import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';
export const InvoiceForm = ({ setShowForm, newInvoice, invoice }) => {
  const senderAddress = {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  };

  const { street, city, postCode, country } = senderAddress;

  const dispatch = useDispatch();

  const { invoices, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.invoices
  );

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }

    dispatch(reset);
  }, [invoices, isLoading, isError, isSuccess, message, dispatch]);

  const [formData, setFormData] = useState({
    street: street,
    city: city,
    postCode: postCode,
    country: country,
    clientEmail: newInvoice ? '' : invoice?.clientEmail,
    clientName: newInvoice ? '' : invoice?.clientName,
    clientCity: newInvoice ? '' : invoice?.clientAddress.city,
    clientStreet: newInvoice ? '' : invoice?.clientAddress.street,
    clientCountry: newInvoice ? '' : invoice?.clientAddress.country,
    clientPostCode: newInvoice ? '' : invoice?.clientAddress.postCode,
    description: newInvoice ? '' : invoice?.description,
    invoiceDate: newInvoice ? '' : invoice?.createdAt,
    id: newInvoice ? '' : invoice?.id,
    paymentDue: newInvoice ? '' : invoice?.paymentDue,
    paymentTerms: newInvoice ? '' : invoice?.paymentTerms,
    status: newInvoice ? 'draft' : invoice?.status,
    total: newInvoice ? '' : invoice?.total,
    items: newInvoice ? [] : invoice?.items,
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
  } = formData;

  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [itemsValue, setItemsValue] = useState(invoice?.items);
  const [selectedOption, setSelectedOption] = useState(1);

  const [open, setOpen] = useState(false);

  const inputOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
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
    };

    console.log(invoiceData);
    dispatch(addInvoice(invoiceData));

    setShowForm((prev) => !prev);
  };

  useEffect(() => {}, []);
  console.log(formData);
  return (
    <div className={styles.invoiceForm}>
      {newInvoice ? (
        <h2>New Invoice</h2>
      ) : (
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {invoice?.id}
        </h2>
      )}

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formSection}>
          <InvoiceFormInput
            type='text'
            itemName='id'
            itemLabel='invoice id'
            value={newInvoice ? '' : invoice.id}
            setValue={inputOnChange}
          />
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
            value={street}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='city'
            itemLabel='City'
            value={city}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={postCode}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            value={country}
            setValue={inputOnChange}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            type='text'
            itemName='clientName'
            itemLabel="Client's Name"
            value={newInvoice ? '' : invoice.clientName}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientEmail'
            itemLabel="Client's Email"
            value={newInvoice ? '' : invoice.clientEmail}
            setValue={inputOnChange}
          />

          <InvoiceFormInput
            type='text'
            itemName='clientStreet'
            itemLabel='Street Address'
            value={newInvoice ? '' : invoice.clientAddress.street}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientCity'
            itemLabel='City'
            value={newInvoice ? '' : invoice.clientAddress.city}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientPostCode'
            itemLabel='Post Code'
            value={newInvoice ? '' : invoice.clientAddress.postCode}
            setValue={inputOnChange}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientCountry'
            itemLabel='Country'
            value={newInvoice ? '' : invoice.clientAddress.country}
            setValue={inputOnChange}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='invoiceDate'
              itemLabel='Invoice Date'
              value={newInvoice ? '' : invoice.createdAt}
              setValue={inputOnChange}
            />

            <InvoiceFormSelect
              options={options}
              selectedKey={selectedOption}
              placeholder={'type to search'}
              onChange={(item) => setSelectedOption(item)}
              open={open}
              setOpen={setOpen}
            />
          </div>
          <InvoiceFormInput
            type='text'
            itemName='description'
            itemLabel='Project/Description'
            value={newInvoice ? '' : invoice.description}
            setValue={inputOnChange}
          />
        </div>

        <div className={styles.formItemsSection}>
          <h2>Item List</h2>

          <div className={styles.items}>
            {itemsValue?.map((item, i) => (
              <InvoiceFormItem
                item={item}
                key={`item${i}`}
                value={item}
                setItemsValue={setItemsValue}
              />
            ))}
          </div>

          <Button btnStyle='btnThree' fullWidth>
            + Add New Item
          </Button>
        </div>
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
