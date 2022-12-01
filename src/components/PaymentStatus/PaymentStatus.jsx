import styles from './styles/PaymentStatus.module.css';
export const PaymentStatus = ({status,  className}) => {
  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = '#33d69f';
  } else if (status === 'pending') {
    paymentStatusColor = '#ff8f00';
  } 


  // else if (status === 'draft') {
  //   paymentStatusColor = light ? '#373b53' : '#dfe3fa';
  // }
  return (
    <div
      className={`${styles.paymentStatus} ${className}`}
      // --paymentStatusColor set from paymentStatusColor variable above
      style={{ '--paymentStatusColor': `${paymentStatusColor}` }}>
      <div className={styles.customBullet}></div>
      <h4>{status}</h4>
    </div>
  );
};
