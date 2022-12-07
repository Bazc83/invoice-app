import styles from './InvoiceForm.module.css';
import { InvoiceFormItem } from './InvoiceFormItem';
export const InvoiceForm = ({ newInvoice }) => {
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

          
        </div>
      </form>
    </div>
  );
};
