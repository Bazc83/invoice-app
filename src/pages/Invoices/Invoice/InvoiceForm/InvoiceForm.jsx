import { Button } from '@components/Button';
import { useState } from 'react';
import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';

export const InvoiceForm = ({ newInvoice, setShowEdit, invoiceState }) => {
  console.log(invoiceState);
  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];
  const [selectedOption, setSelectedOption] = useState(30);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.invoiceForm}>
      {newInvoice ? (
        <h2>New Invoice</h2>
      ) : (
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {invoiceState.id}
        </h2>
      )}

      <form className={styles.form}>
        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormInput
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
            inputValue={invoiceState?.senderAddress.street}
          />
          <InvoiceFormInput
            type='text'
            itemName='city'
            itemLabel='City'
            inputValue={invoiceState?.senderAddress.city}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            inputValue={invoiceState?.senderAddress.postCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            itemLabel='Country'
            inputValue={invoiceState?.senderAddress.country}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormInput
            type='text'
            itemName='clientsName'
            itemLabel="Client's Name"
            inputValue={invoiceState?.clientName}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
            inputValue={invoiceState?.clientEmail}
          />

          <InvoiceFormInput
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
            inputValue={invoiceState?.clientAddress.street}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientsCity'
            itemLabel='City'
            inputValue={invoiceState?.clientAddress.city}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            inputValue={invoiceState?.clientAddress.postCode}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            itemLabel='Country'
            inputValue={invoiceState?.clientAddress.country}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='invoiceDate'
              itemLabel='Invoice Date'
              inputValue={invoiceState?.createdAt}
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
            inputValue={invoiceState?.description}
          />
        </div>

        <div className={styles.formItemsSection}>
          <h2>Item List</h2>

          <div className={styles.items}>
            {invoiceState?.items?.map((item, i) => (
              <InvoiceFormItem item={item} key={`item${i}`} />
            ))}
          </div>

<InvoiceFormItem />
          <Button btnStyle='btnThree' fullWidth>
            + Add New Item
          </Button>
        </div>
      </form>

      <div className={styles.formButtons}>
        <Button
          onClick={() => setShowEdit((prev) => !prev)}
          btnStyle='btnThree'>
          Cancel
        </Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
