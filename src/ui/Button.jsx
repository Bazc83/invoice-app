import styles from '@styles/Button.module.css';
import { FaPlus } from 'react-icons/fa';

export const Button = (props) => {
  const { children, onClick, type, plusIcon, btnStyle, plusIconWide } = props;

  const light = false;

  // If light set css to light variant
  const btnStyling = light
    ? `${styles[btnStyle] ? styles[`${btnStyle}Light`] : styles.btnPrimary}`
    : `${styles[btnStyle] ? styles[btnStyle] : styles.btnPrimary}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${btnStyling} ${styles.btn} ${
        plusIcon && styles.btnWithIcon
      } `}>
      {plusIcon && (
        <div className={styles.btnIcon}>
          <FaPlus />
        </div>
      )}
      {children}
    </button>
  );
};
