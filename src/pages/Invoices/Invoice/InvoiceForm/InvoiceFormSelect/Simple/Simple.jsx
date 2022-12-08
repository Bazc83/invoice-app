import { useEffect, useState } from 'react';
import styles from './Simple.module.css';
export const Simple = ({
  options,
  placeholder = '',
  onChange,
  selectedKey,
  open,
  setOpen,
}) => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onItemSelected = (option) => {
    onChange !== undefined && onChange(option.key);
    onChange !== undefined && setInputValue(option.value);

    setOpen(false);
  };

  const onInputClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (selectedKey) {
      setInputValue(options.find((o) => o.key === selectedKey).value);
    }
  }, [selectedKey]);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.inputContainer} onClick={onInputClick}>
        <input
          type='text'
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
          hidden
        />
        <p >{inputValue}</p>

        <div className={styles.inputArrowContainer}>
          <i className={styles.inputArrow} />
        </div>
        <div className={styles.inputClearContainer}>X</div>
      </div>

      <div className={`${styles.dropdown} ${open && styles.visible}`}>
        {options.map((option) => {
          return (
            <div
              key={option.key}
              onClick={() => onItemSelected(option)}
              className={styles.option}>
              {option.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};
