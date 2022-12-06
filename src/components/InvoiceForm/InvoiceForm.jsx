import React from 'react';
import styles from './InvoiceForm.module.css';
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


          <div className={styles.formItem}>
            <label htmlFor="streetAddress" className='text-faded'>Street Address</label>
            <input type="text" name="streetAddress"   className={`text`}/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="city" className='text-faded'>City</label>
            <input type="text" name="city"   className={`text`}/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="postCode" className='text-faded'>Post Code</label>
            <input type="text" name="postCode"   className={`text`}/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor="country" className='text-faded'>Country</label>
            <input type="text" name="country"  className={`text`} />
          </div>
        </div>


        <div className={styles.formSection}>
          <h4 className={styles.formSectionHeader}>Bill To</h4>
        </div>
      </form>
    </div>
  );
};
