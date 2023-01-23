import styles from './InvoiceForm.module.css';

export function FormId({ state }) {
  return (
    <h2>
      Edit <span className={styles.invoiceFormHeaderAccent}>#</span>
      {state.formData?.id}
    </h2>
  );
}
