
export const InvoiceItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center gap-2 text-xs">
      <div className='flex flex-col gap-2'>
        <p>{item?.name}</p>

        <p className="text-gray-700 dark:text-gray-400 text-xs">
          {item?.quantity} x{' '}
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(item?.price)}
        </p>
      </div>
      <p>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </p>
    </div>
  );
};
