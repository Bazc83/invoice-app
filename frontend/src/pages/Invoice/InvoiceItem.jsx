function InvoiceItem({ item }) {
  return (
    <div className="grid grid-cols-[0.5rem_repeat(10,_1fr)_0.5rem] grid-rows-2  items-center gap-1 border-b border-b-gray-300 bg-skin-secondary py-4 px-4 text-sm  text-skin-base last:border-b-0 dark:border-b-gray-600 md:grid-rows-1 md:gap-4 md:px-0 print:border-black">
      <p className="col-start-2 col-end-8 row-start-1 row-end-1 text-start md:col-end-6 md:row-span-full ">
        {item?.name}
      </p>

      <p className="col-start-7 col-end-8 hidden pl-4 text-end md:block ">
        {item?.quantity}
      </p>

      <p
        className="col-start-2 col-end-9 row-start-2 row-end-2  text-xs text-gray-600 dark:text-gray-400 md:col-start-8 md:col-end-10
      md:row-span-full   md:text-end md:text-sm md:text-inherit md:dark:text-inherit "
      >
        <span className="md:hidden ">{item?.quantity} x </span>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.price)}
      </p>

      <p className="col-start-9 col-end-12 row-span-full  text-end sm:col-start-10 sm:col-end-12 ">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(item?.total)}
      </p>
    </div>
  );
}
export default InvoiceItem;
