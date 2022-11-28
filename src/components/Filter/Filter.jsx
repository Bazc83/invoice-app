import styles from '@styles/Filter.module.css';
import { useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FilterModal } from './FilterModal';

export const Filter = ({ light }) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  return (
    <div
      className={styles.filter}
      onClick={() => setFilterIsOpen((prev) => !prev)}>
      <p className='text'>Filter</p>
      {filterIsOpen ? (
        <FaChevronUp className={styles.filterIcon} />
      ) : (
        <FaChevronDown className={styles.filterIcon} />
      )}

      {filterIsOpen && <FilterModal light={light} />}
    </div>
  );
};
