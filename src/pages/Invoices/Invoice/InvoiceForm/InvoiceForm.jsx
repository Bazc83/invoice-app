import { Button } from '@components/Button';
import { useState } from 'react';
import styles from './InvoiceForm.module.css';
import { InvoiceFormInput } from './InvoiceFormInput';
import { InvoiceFormItem } from './InvoiceFormItem/InvoiceFormItem';
import { InvoiceFormSelect } from './InvoiceFormSelect/InvoiceFormSelect';

export const InvoiceForm = ({
  setShowEdit,
  mainInvoiceData,
  clientAddress,
  senderAddress,
  items,
  newInvoice,
}) => {
  const options = [
    { key: 1, value: 'Net 1 Day' },
    { key: 7, value: 'Net 7 Days' },
    { key: 14, value: 'Net 14 Days' },
    { key: 30, value: 'Net 30 Days' },
  ];

  const [selectedOption, setSelectedOption] = useState(
    mainInvoiceData.paymentTerms
  );

  const [open, setOpen] = useState(false);

 


  // ! Set state for each form input 
  // ! Then Add them too form input component as value and setValue
  // ! On form submit change on firestore

  
  const [clientName, setClientName] = useState(mainInvoiceData.clientName);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(clientName);
  };

  
  return (
    <div className={styles.invoiceForm}>
      {newInvoice ? (
        <h2>New Invoice</h2>
      ) : (
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
          {mainInvoiceData?.id}
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
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='city'
            itemLabel='City'
            value={senderAddress.city}
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={senderAddress.postCode}
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            value={senderAddress.country}
            parentId={mainInvoiceData?.id}
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
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
            value={mainInvoiceData.clientEmail}
            parentId={mainInvoiceData?.id}
          />

          <InvoiceFormInput
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
            value={clientAddress.street}
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='clientsCity'
            itemLabel='City'
            value={clientAddress.city}
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
            value={clientAddress.postCode}
            parentId={mainInvoiceData?.id}
          />
          <InvoiceFormInput
            type='text'
            itemName='country'
            itemLabel='Country'
            value={clientAddress.country}
            parentId={mainInvoiceData?.id}
          />

          <div className='grid-row-half'>
            <InvoiceFormInput
              type='date'
              itemName='invoiceDate'
              itemLabel='Invoice Date'
              value={mainInvoiceData?.createdAt}
              parentId={mainInvoiceData?.id}
            />

            <InvoiceFormSelect
              options={options}
              selectedKey={selectedOption}
              placeholder={'type to search'}
              onChange={(item) => setSelectedOption(item)}
              open={open}
              setOpen={setOpen}
              parentId={mainInvoiceData?.id}
            />
          </div>
          <InvoiceFormInput
            type='text'
            itemName='projectDescription'
            itemLabel='Project/Description'
            value={mainInvoiceData.description}
            parentId={mainInvoiceData?.id}
          />
        </div>

        <div className={styles.formItemsSection}>
          <h2>Item List</h2>

          <div className={styles.items}>
            {items?.map((item, i) => (
              <InvoiceFormItem
                item={item}
                key={`item${i}`}
                parentId={mainInvoiceData?.id}
              />
            ))}
          </div>

          <InvoiceFormItem />
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
