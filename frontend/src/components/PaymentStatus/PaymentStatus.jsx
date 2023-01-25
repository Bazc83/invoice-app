export const PaymentStatus = ({ status, className }) => {
  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = 'text-emerald-600 border-emerald-600';
  } else if (status === 'pending') {
    paymentStatusColor = 'text-orange-600 border-orange-600';
  } else if (status === 'draft') {
    paymentStatusColor = 'text-white border-white dark:border-gray-900 dark:text-gray-900  ';
  }

  return (
    <div
      className={`flex border-[1px] w-[100px]  items-center justify-center  ${paymentStatusColor} py-2 px-4 text-sm capitalize rounded-md `}>
      <p className={`${className} `}>{status}</p>
    </div>
  );
};
