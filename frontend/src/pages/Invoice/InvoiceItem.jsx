function InvoiceItem({ item }) {
  return (
    <div className="secondary-bg  grid grid-cols-[0.5rem_repeat(10,_1fr)_0.5rem] grid-rows-2 items-center gap-2 border-b border-b-gray-300 py-4  last:border-b-0 dark:border-b-gray-600 text-sm md:grid-rows-1 md:gap-4  ">
      <p className="col-start-2 col-end-8 row-start-1 row-end-1 text-start md:col-end-6 md:row-span-full ">
        {item?.name}
      </p>

      <p className="col-start-7 col-end-8 hidden pl-4 text-center md:block ">
        {item?.quantity}
      </p>

      <p className="col-start-2 col-end-9 row-start-2 row-end-2  text-gray-600 dark:text-gray-400 md:col-start-8 md:col-end-10 md:row-span-full  md:text-end text-sm md:text-inherit md:dark:text-inherit ">
        <span className="md:hidden">{item?.quantity} x </span>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.price)}
      </p>

      <p className="col-start-9 col-end-12 row-span-full  sm:col-start-10 sm:col-end-12 sm:text-end">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </p>
    </div>
  );
}
export default InvoiceItem;
