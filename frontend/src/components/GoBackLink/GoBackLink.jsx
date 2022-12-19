import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './GoBackLink.module.css';
export const GoBackLink = ({linkPath}) => {
  return (
    <div className={styles.goBackLinkWrapper}>
      <FaChevronLeft className={styles.iconLeft} />
      <Link to={linkPath} className={styles.goBackLink}>
        Go back
      </Link>
    </div>
  );
};
