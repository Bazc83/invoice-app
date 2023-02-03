import InvoiceItem from './InvoiceItem';

function ItemsSection({ invoiceData }) {
  return (
    <div className="grid grid-cols-12  text-sm lg:text-base">
      <p className="secondary-text col-span-full col-start-2 pb-2 lg:pb-4">
        Invoice Items:
      </p>

      {/* Invoice items */}
      <div className="primary-bg col-span-10  col-start-2 flex flex-col  justify-center  rounded-t-md  border-2 border-gray-300  dark:border-gray-600  text-xs sm:text-sm">
        {/* invoice items headers for screens md and above else hidden */}
        <div
          className=" grid-cols-12 gap-4 rounded-t-md border-b-2 border-gray-300 py-1
        text-xs dark:border-gray-600  grid "
        >
          <h3 className="col-start-2 col-span-6  md:col-end-6 text-start">Item</h3>
          <h3 className="md:col-start-6 md:col-span-1 hidden md:block text-center ">Qty</h3>
          <h3 className="md:col-start-8 md:col-span-2 hidden md:block  text-center">Price</h3>
          <h3 className="col-start-9 sm:col-start-10 col-span-2 text-center ">Item Total</h3>
        </div>

        {/* Invoice items content */}
        {invoiceData?.items?.map((item) => (
          <InvoiceItem item={item} key={item.itemId} />
        ))}
      </div>

      {/* Total amount due */}
      <div className="primary-bg col-span-10  col-start-2 flex flex-wrap items-center justify-between gap-1 rounded-b-md border-2  border-t-0 border-gray-300 px-4  py-2 text-xs dark:border-gray-600 md:grid md:grid-cols-12  md:gap-4  lg:text-sm">
        <p className=" md:col-start-7 md:col-end-10  md:w-full md:text-end ">
          Amount Due
        </p>
        <h3 className=" md:col-start-10 md:col-end-12">
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(invoiceData?.amountDueTotal)}
        </h3>
      </div>
    </div>
  );
}
export default ItemsSection;
