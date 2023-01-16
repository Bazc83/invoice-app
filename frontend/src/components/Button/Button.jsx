import { FaPlus } from 'react-icons/fa';
import styles from './Button.module.css';

export const Button = (props) => {
  const { children, onClick, type, plusIcon, btnStyle, fullWidth } = props;

  // If light set css to light variant
  const btnStyling = `${
    styles[btnStyle] ? styles[`${btnStyle}`] : styles.btnPrimary
  }`;

  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`${btnStyling} ${styles.btn} ${
        plusIcon && styles.btnWithIcon
      } ${fullWidth && styles.fullWidth}`}>
      {plusIcon && (
        <div className={styles.btnIcon}>
          <FaPlus />
        </div>
      )}
      {children}
    </button>
  );
};
