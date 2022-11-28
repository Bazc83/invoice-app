import { DarkModeContext } from '@/App';
import styles from '@styles/Button.module.css';
import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';

export const Button = (props) => {
  const { light } = useContext(DarkModeContext);
  const { children, onClick, type, plusIcon, btnStyle } = props;


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
