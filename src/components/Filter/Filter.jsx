import { useState } from 'react';
import styles from './styles/Filter.module.css';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FilterModal } from './FilterModal';

export const Filter = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

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
      {filterIsOpen && <FilterModal  />}
    </div>
  );
};
