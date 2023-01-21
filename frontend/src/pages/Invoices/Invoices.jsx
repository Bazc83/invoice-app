import { InvoicePreview } from '@/components/InvoicePreview';
import { InvoicesPageControls } from '@/components/InvoicesPageControls';
import { NewInvoiceForm } from '@/components/NewInvoiceForm';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { useContext, useEffect, useState } from 'react';
import styles from './Invoices.module.css';

export const Invoices = () => {
  const {state } = useContext(InvoicesContext)

  const { isLoading, isError, error, data: invoices } = useInvoices();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState();

 

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices]);

  // const updateFilters = () => {
  //   for (const filterVal in state.filters) {
  //     if (state.filters[filterVal]) {
  //       if (selectedFilters?.length === 0) {
  //         setSelectedFilters([filterVal]);
  //       } else {
  //         setSelectedFilters((prev) => [
  //           ...prev.filter((val) => val !== filterVal),
  //           filterVal,
  //         ]);
  //       }
  //     } else {
  //       setSelectedFilters((prev) => [
  //         ...prev.filter((val) => val !== filterVal),
  //       ]);
  //     }
  //   }
  // };

  // const runFilter = () => {

  //   if (selectedFilters.length > 0) {
  //     setFilteredInvoices(
  //       invoices.filter((filterVal) =>
  //         selectedFilters.includes(filterVal.status)
  //       )
  //     );
  //   } else {
  //     setFilteredInvoices(invoices);
  //   }
  // };

  // useEffect(() => {
  //   updateFilters();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.filters]);

  // useEffect(() => {
  //   runFilter();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedFilters]);

  if (isLoading) return 'Loading...';
  if (isError) return 'An error has occurred: ' + error.message;

  return (
    <div className={`container main-bg`}>
      <InvoicesPageControls
        invoicesData={invoices?.length}
        // updateFilters={updateFilters}
       
      />

      {state.showInvoiceForm && <NewInvoiceForm />}
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
