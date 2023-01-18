import { FilterModalItem } from '@/components/FilterModalItem';
import { PageLayoutContext } from '@/pages/PageLayout';
import { useContext, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './Filter.module.css';

export const Filter = ({ filterInvoices, filters, setFilters }) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const { showModal, setShowModal } = useContext(PageLayoutContext);

  const handleShowModal = () => {
    setFilterIsOpen((prev) => !prev);
    setShowModal((prev) => !prev);
  };

  const filterChangeHandler = (checkboxName) => {
    setFilters((prev) => ({ ...prev, [checkboxName]: !prev[checkboxName] }));
    setFilterIsOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filter} onClick={handleShowModal}>
        <h4>Filter</h4>
        {filterIsOpen ? (
          <FaChevronUp className={styles.filterIcon} />
        ) : (
          <FaChevronDown className={styles.filterIcon} />
        )}
      </div>

      {showModal && (
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
