function InvoiceItem({ item }) {
  return (
    <div className="secondary-bg  grid grid-cols-12 grid-rows-2 items-center gap-4 border-b dark:border-b-gray-600 border-b-gray-300 py-2 text-xs sm:text-sm last:border-b-0 md:grid-rows-1  ">
      <p className="col-start-2 col-span-6 row-start-1 row-end-1 md:col-end-6 md:row-span-full text-start ">
        {item?.name}
      </p>

      <p className="col-start-6 col-span-1 hidden pl-4 md:block text-end ">
        {item?.quantity}
      </p>

      <p className="text-gray-600 dark:text-gray-400 col-start-2 col-end-9 row-start-2 row-end-2 text-xs md:text-sm md:col-start-8 md:col-span-2  md:row-span-full md:text-inherit md:dark:text-inherit md:text-end ">
        <span className="md:hidden">{item?.quantity} x </span>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.price)}
      </p>

      <p className="col-start-9 col-span-4 sm:col-span-2  row-span-full sm:col-start-10 md:text-end">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </p>
    </div>
  );
}
export default InvoiceItem;
