export const PaymentStatus = ({ status, className }) => {
  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = 'text-emerald-600 ';
  } else if (status === 'pending') {
    paymentStatusColor = 'text-orange-500 ';
  } else if (status === 'draft') {
    paymentStatusColor = 'text-white';
  }

  return <p className={`${className} ${paymentStatusColor} `}>{status}</p>;
};
