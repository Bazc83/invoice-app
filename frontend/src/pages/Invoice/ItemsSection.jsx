import InvoiceItem from './InvoiceItem';

function ItemsSection({ invoiceData }) {
  return (
    <div className="grid grid-cols-12 gap-2 text-sm lg:text-base ">
      <p className="secondary-text col-span-full col-start-2 ">
        Invoice Items:
      </p>

      {/* Invoice items */}
      <div className="primary-bg col-span-10  col-start-2 flex flex-col  justify-center  rounded-sm  border-2 border-gray-300  text-sm dark:border-gray-600 sm:text-sm">
        {/* invoice items headers for screens md and above else hidden */}
        <div
          className=" grid grid-cols-[0.5rem_repeat(10,_1fr)_0.5rem] gap-2 rounded-t-md border-b-2 border-gray-300 py-2
         dark:border-gray-600  md:gap-4 "
        >
          <h3 className="col-start-2 col-end-6 text-start md:col-end-6 ">
            Item
          </h3>
          <h3 className="hidden text-center md:col-start-7 md:col-end-8 md:block ">
            Qty
          </h3>
          <h3 className="hidden text-center md:col-start-8 md:col-end-10  md:block">
            Price
          </h3>
          <h3 className="col-start-7 col-end-12 text-center md:col-start-10 ">
            Item Total
          </h3>
        </div>

        {/* Invoice items content */}
        {invoiceData?.items?.map((item) => (
          <InvoiceItem item={item} key={item.itemId} />
        ))}

        {/* Total amount due */}
        <div className="primary-bg  col-span-full flex flex-wrap items-center justify-between gap-2 px-6 py-2  text-sm  md:justify-end md:gap-4   ">
          <p>Amount Due</p>
          <h3>
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'GBP',
            }).format(invoiceData?.amountDueTotal)}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default ItemsSection;
