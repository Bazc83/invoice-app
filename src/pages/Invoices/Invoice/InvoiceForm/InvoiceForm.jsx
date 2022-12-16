import { InvoicesContext } from '@/App';
import { Button } from '@components/Button';
import { useContext, useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';

export const InvoiceForm = ({
  setShowEdit,
  items,
  newInvoice,
  invoiceData,
  InvoiceValues
}) => {


  const { senderAddress, options } = useContext(InvoicesContext);

  const [open, setOpen] = useState(false);

  const [clientName, setClientName] = useState(
    newInvoice ? '' : invoiceData?.clientName
  );
  const [clientEmail, setClientEmail] = useState(
    newInvoice ? '' : invoiceData?.clientEmail
  );
  const [clientStreet, setClientStreet] = useState(
    newInvoice ? '' : invoiceData?.clientAddress.street
  );
  const [clientCity, setClientCity] = useState(
    newInvoice ? '' : invoiceData?.clientAddress.city
  );
  const [clientPostCode, setClientPostCode] = useState(
    newInvoice ? '' : invoiceData?.clientAddress.postCode
  );
  const [clientCountry, setClientCountry] = useState(
    newInvoice ? '' : invoiceData?.clientAddress.country
  );
  const [invoiceCreatedAt, setInvoiceCreatedAt] = useState(
    newInvoice ? '' : invoiceData?.createdAt
  );
  const [selectedOption, setSelectedOption] = useState(
    newInvoice ? 1 : invoiceData?.paymentTerms
  );

  const [invoiceDescription, setInvoiceDescription] = useState(
    newInvoice ? '' : invoiceData?.description
  );

  const [invoiceStatus, setInvoiceStatus] = useState(
    newInvoice ? '' : invoiceData?.status
  );
  const [invoiceItems, setInvoiceItems] = useState(
    newInvoice ? [] : invoiceData?.items
  );
  const [invoiceTotal, setInvoiceTotal] = useState(
    newInvoice ? '' : invoiceData?.total
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    setShowEdit((prev) => !prev);
  };

  return (
    <div className={styles.invoiceForm}>
      {newInvoice ? (
        <h2>New Invoice</h2>
      ) : (
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {'needs replaced'}
        </h2>
      )}

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
            value={senderAddress.street}
          />
          <InvoiceFormInput
            type='text'
            itemName='city'
            itemLabel='City'
            value={senderAddress.city}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={senderAddress.postCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            value={senderAddress.country}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            type='text'
            itemName='clientsName'
            itemLabel="Client's Name"
            value={clientName}
            setValue={setClientName}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
            value={clientEmail}
            setValue={setClientEmail}
          />

          <InvoiceFormInput
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
            value={clientStreet}
            setValue={setClientStreet}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientsCity'
            itemLabel='City'
            value={clientCity}
            setValue={setClientCity}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={clientPostCode}
            setValue={setClientPostCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            itemLabel='Country'
            value={clientCountry}
            setValue={setClientCountry}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='invoiceDate'
              itemLabel='Invoice Date'
              value={invoiceCreatedAt}
              setValue={setInvoiceCreatedAt}
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
            itemName='projectDescription'
            itemLabel='Project/Description'
            value={invoiceDescription}
            setValue={setInvoiceDescription}
          />
        </div>

        <div className={styles.formItemsSection}>
          <h2>Item List</h2>

          <div className={styles.items}>
            {invoiceItems?.map((item, i) => (
              <InvoiceFormItem
                item={item}
                key={`item${i}`}
                value={invoiceItems}
                setValue={setInvoiceItems}
              />
            ))}
          </div>

          <Button btnStyle='btnThree' fullWidth>
            + Add New Item
          </Button>
        </div>
        <div className={styles.formButtons}>
          <Button
            onClick={() => setShowEdit((prev) => !prev)}
            btnStyle='btnThree'>
            Cancel
          </Button>
          <Button type='submit'>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
