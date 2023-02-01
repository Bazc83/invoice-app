export function PaymentStatus({ status, className }) {
  let paymentStatusColor;
  if (status === 'paid') {
    paymentStatusColor = 'text-emerald-600 border-emerald-600';
  } else if (status === 'pending') {
    paymentStatusColor = 'text-orange-600 border-orange-600 ';
  } else if (status === 'draft') {
    paymentStatusColor =
      'dark:text-gray-50 dark:border-gray-50 border-gray-900 text-gray-900  ';
  }

  return (
    <div
      className={`flex w-[100px] items-center justify-center border-[1px]  ${paymentStatusColor} rounded-md py-2 px-4 text-sm font-semibold capitalize`}
    >
      <p className={`${className} `}>{status}</p>
    </div>
  );
}

export default PaymentStatus;
