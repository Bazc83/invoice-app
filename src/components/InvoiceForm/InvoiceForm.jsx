import { Button } from '../Button';
import styles from './InvoiceForm.module.css';
import { InvoiceFormItem } from './InvoiceFormItem';
export const InvoiceForm = ({ newInvoice, setShowEdit}) => {
  return (
    <div className={styles.invoiceForm}>
      {newInvoice ? (
        <h2>New Invoice</h2>
      ) : (
        <h2>
          Edit <span className={styles.invoiceFormHeaderAccent}>#</span>24324F
        </h2>
      )}

      <form className={styles.form}>
        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill From</h4>
          <InvoiceFormItem
            type='text'
            itemName='streetAddress'
            itemLabel='Street Address'
          />
          <InvoiceFormItem type='text' itemName='city' itemLabel='City' />
          <InvoiceFormItem
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
          />
          <InvoiceFormItem type='text' itemName='country' itemLabel='Country' />
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
          <InvoiceFormItem
            type='text'
            itemName='clientsName'
            itemLabel="Client's Name"
          />
          <InvoiceFormItem
            type='email'
            itemName='clientsEmail'
            itemLabel="Client's Email"
          />

          <InvoiceFormItem
            type='text'
            itemName='clientsStreetAddress'
            itemLabel='Street Address'
          />
          <InvoiceFormItem
            type='text'
            itemName='clientsCity'
            itemLabel='City'
          />
          <InvoiceFormItem
            type='text'
            itemName='postCode'
            itemLabel='Post Code'
          />
          <InvoiceFormItem type='text' itemName='country' itemLabel='Country' />
          <InvoiceFormItem
            type='date'
            itemName='invoiceDate'
            itemLabel='Invoice Date'
          />

          <select>
            <option value='Net 30 Days'>Net 30 Days</option>
          </select>

          <InvoiceFormItem
            type='text'
            itemName='projectDescription'
            itemLabel='Project/Description'
          />
        </div>
      </form>

      <div>
        <Button>Cancel</Button>{' '}
        <Button onClick={() => setShowEdit((prev) => !prev)}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
