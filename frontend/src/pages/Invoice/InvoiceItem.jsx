export function InvoiceItem({ item }) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <div className="flex flex-col gap-2">
        <p>{item?.name}</p>

        <p className="text-xs text-gray-700 dark:text-gray-400">
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
}
export default InvoiceItem;
