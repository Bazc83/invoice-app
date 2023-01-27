export const AmountDueTotal = ({ amountDue }) => {
  return (
    <div className="bg-gray-900 text-gray-50 flex px-4 py-2 justify-between items-center rounded-b-sm">
      <p className='text-xs'>Amount Due</p>
      <h2>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(amountDue)}
      </h2>
    </div>
  );
};
