import { Button } from '@components/Button';
import { useContext, useEffect, useState } from 'react';
import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';

export const InvoiceForm = ({ setShowEdit, newInvoice, invoice }) => {
  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [itemsValue, setItemsValue] = useState(invoice?.items);
  const [selectedOption, setSelectedOption] = useState(1);

  const [open, setOpen] = useState(false);

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
          {invoice?.id}
        </h2>
      )}

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
            value={invoice.senderAddress.street}
          />
          <InvoiceFormInput
            type='text'
            itemName='city'
            itemLabel='City'
            value={invoice.senderAddress.city}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={invoice.senderAddress.postCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            value={invoice.senderAddress.country}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            type='text'
            itemName='clientsName'
            itemLabel="Client's Name"
            value={invoice.clientName}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
            value={invoice.clientEmail}
          />

          <InvoiceFormInput
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
            value={invoice.clientAddress.street}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientsCity'
            itemLabel='City'
            value={invoice.clientAddress.city}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={invoice.clientAddress.postCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            itemLabel='Country'
            value={invoice.clientAddress.country}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='invoiceDate'
              itemLabel='Invoice Date'
              value={invoice.createdAt}
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
            value={invoice.description}
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
