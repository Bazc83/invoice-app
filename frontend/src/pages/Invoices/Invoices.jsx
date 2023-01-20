import { InvoicePreview } from '@/components/InvoicePreview';
import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { useInvoicesContext } from '@/hooks/useContextHooks/useInvoicesContext';
import { useEffect, useState } from 'react';
import styles from './Invoices.module.css';

export const Invoices = () => {
  const { showInvoiceForm} = useInvoicesContext();

  const { isLoading, isError, error, data: invoices } = useInvoices();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState();

  const [filters, setFilters] = useState({
    paid: false,
    pending: false,
    draft: false,
  });

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  const updateFilters = () => {
    for (const filterVal in filters) {
      if (filters[filterVal]) {
        if (selectedFilters?.length === 0) {
          setSelectedFilters([filterVal]);
        } else {
          setSelectedFilters((prev) => [
            ...prev.filter((val) => val !== filterVal),
            filterVal,
          ]);
        }
      } else {
        setSelectedFilters((prev) => [
          ...prev.filter((val) => val !== filterVal),
        ]);
      }
    }
  };

  const runFilter = () => {
    if (selectedFilters.length > 0) {
      setFilteredInvoices(
        invoices.filter((filterVal) =>
          selectedFilters.includes(filterVal.status)
        )
      );
    } else {
      setFilteredInvoices(invoices);
    }
  };

  useEffect(() => {
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    runFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={`container main-bg`}>
      <InvoicesPageControls
        invoicesData={invoices?.length}
        updateFilters={updateFilters}
        filters={filters}
        setFilters={setFilters}
      />

      {showInvoiceForm && <NewInvoiceForm />}
      {invoices?.length === 0 && <NoInvoices />}
      <div className={styles.invoicesWrapper}>
        {invoices?.length > 0 &&
          filteredInvoices?.map((invoice) => {
            return <InvoicePreview invoice={invoice} key={invoice?.id} />;
          })}
      </div>
    </div>
  );
};
