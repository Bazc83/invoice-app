import { useState } from 'react';
import styles from './Filter.module.css';

import { FilterModalItem } from '@/components/FilterModalItem';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Filter = ({ filterInvoices, filters, setFilters }) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const filterChangeHandler = (checkboxName) => {
    setFilters((prev) => ({ ...prev, [checkboxName]: !prev[checkboxName] }));
    setFilterIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.filterWrapper}>
      <div
        className={styles.filter}
        onClick={() => setFilterIsOpen((prev) => !prev)}>
        <h4>Filter</h4>
        {filterIsOpen ? (
          <FaChevronUp className={styles.filterIcon} />
        ) : (
          <FaChevronDown className={styles.filterIcon} />
        )}
      </div>

      {filterIsOpen && (
        <div className={styles.modal}>
          <form className={styles.modalForm}>
            <FilterModalItem
              checkboxLabel={'draft'}
              filterInvoices={filterInvoices}
              filterChangeHandler={filterChangeHandler}
              filters={filters}
            />

            <FilterModalItem
              checkboxLabel={'pending'}
              filterInvoices={filterInvoices}
              filterChangeHandler={filterChangeHandler}
              filters={filters}
            />

            <FilterModalItem
              checkboxLabel={'paid'}
              filterInvoices={filterInvoices}
              filterChangeHandler={filterChangeHandler}
              filters={filters}
            />
          </form>
        </div>
      )}
    </div>
  );
};
