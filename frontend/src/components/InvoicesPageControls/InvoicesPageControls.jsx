import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import styles from './InvoicesPageControls.module.css';
export const InvoicesPageControls = ({
  invoicesData,
  setShowInvoiceForm,
  filterInvoices,
  filters,
  setFilters,
}) => {
  return (
    <div className={styles.invoicesPageController}>
      <div className={styles.invoicesControllerLeftSide}>
        <h2>Invoices</h2>
        <p className='text-faded'>
          {invoicesData === 0 ? 'No' : invoicesData}{' '}
          {invoicesData === 1 ? 'invoice' : 'invoices'}
        </p>
      </div>

      <div className={styles.invoicesControllerRightSide}>
        {/* Filter invoices compontent */}
        <Filter
          filterInvoices={filterInvoices}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Button shows new invoice form */}
        <Button plusIcon onClick={() => setShowInvoiceForm((prev) => !prev)}>
          New
        </Button>
      </div>
    </div>
  );
};
