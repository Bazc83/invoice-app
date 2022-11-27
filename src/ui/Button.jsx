import styles from '@styles/Button.module.css';

export const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} type={type} className={styles.btn}>
      {children}
    </button>
  );
};
