import { Button } from '@components/Button';
import { useState } from 'react';
import styles from './InvoiceForm.module.css';
import { InvoiceFormItem } from './InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';
export const InvoiceForm = ({ newInvoice, setShowEdit, invoiceState }) => {

  console.log(invoiceState)
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
          <InvoiceFormItem
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
            inputValue={invoiceState?.senderAddress.street}
          />
          <InvoiceFormItem
            type='text'
            itemName='city'
            itemLabel='City'
            inputValue={invoiceState?.senderAddress.city}
          />
          <InvoiceFormItem
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            inputValue={invoiceState?.senderAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            itemName='country'
            itemLabel='Country'
            inputValue={invoiceState?.senderAddress.country}
          />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormItem
            type='text'
            itemName='clientsName'
            itemLabel="Client's Name"
            inputValue={invoiceState?.clientName}
          />
          <InvoiceFormItem
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
            inputValue={invoiceState?.clientEmail}
          />

          <InvoiceFormItem
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
            inputValue={invoiceState?.clientAddress.street}
          />
          <InvoiceFormItem
            type='text'
            itemName='clientsCity'
            itemLabel='City'
            inputValue={invoiceState?.clientAddress.city}
          />
          <InvoiceFormItem
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            inputValue={invoiceState?.clientAddress.postCode}
          />
          <InvoiceFormItem
            type='text'
            itemName='country'
            itemLabel='Country'
            inputValue={invoiceState?.clientAddress.country}
          />
          <InvoiceFormItem
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

          <InvoiceFormItem
            type='text'
            itemName='projectDescription'
            itemLabel='Project/Description'
            inputValue={invoiceState?.description}
          />
        </div>
      </form>

      <div>
        <Button
          onClick={() => setShowEdit((prev) => !prev)}
          btnStyle='btnThree'>
          Cancel
        </Button>{' '}
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
