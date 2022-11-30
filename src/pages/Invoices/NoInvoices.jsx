import styles from './styles/NoInvoices.module.css';

export const NoInvoices = ({light}) => {
  return (
    <div className={styles.noInvoicesWrapper}>
      <div className={styles.noInvoices}>
        <img src='/images/illustration-empty.svg' alt='no invoices svg' />
        <div>
          <h2>There is nothing here</h2>

          <p style={{"--noInvoices-color": `${light ? "#888EB0": "#DFE3FA"}`}}>
            Create   invoice by clicking the <span className={styles.textNew}>New</span> <span>invoice</span> button and get
            started
          </p>
        </div>
      </div>
    </div>
  );
};
