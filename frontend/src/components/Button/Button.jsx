import { FaPlus } from 'react-icons/fa';

import styles from './Button.module.css';

export function Button(props) {
  const { children, onClick, plusIcon, btnStyle, fullWidth } = props;

  // If light set css to light variant
  const btnStyling = `${
    styles[btnStyle] ? styles[`${btnStyle}`] : styles.btnPrimary
  }`;

  return (
    <button
      onClick={onClick}
      type='button'
      className={`${btnStyling} ${styles.btn} ${
        plusIcon && styles.btnWithIcon
      } ${fullWidth && styles.fullWidth} bg-black`}
    >
      {plusIcon && (
        <div className={styles.btnIcon}>
          <FaPlus />
        </div>
      )}
      {children}
    </button>
  );
}

export default Button;