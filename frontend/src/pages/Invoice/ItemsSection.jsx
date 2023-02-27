import InvoiceItem from './InvoiceItem';

function ItemsSection({ invoiceData }) {
  return (
    <div className="grid grid-cols-12 gap-5 text-sm lg:text-base ">
      <p className="col-span-full col-start-2 text-skin-muted ">
        Invoice Items:
      </p>

      {/* Invoice items */}
      <div className="col-span-10 col-start-2 flex  flex-col justify-center rounded-sm  border-2  border-gray-300  bg-skin-primary text-sm  text-skin-base dark:border-gray-600 print:border-black">
        {/* invoice items headers for screens md and above else hidden */}
        <div
          className=" grid grid-cols-[0.5rem_repeat(10,_1fr)_0.5rem] gap-2 rounded-t-md border-b-2 border-gray-300 py-2 dark:border-gray-600 md:gap-4
         print:border-black  print:dark:border-black "
        >
          <h3 className="col-start-2 col-end-6 text-start md:col-end-6 ">
            Item
          </h3>
          <h3 className="hidden text-end md:col-start-7 md:col-end-8 md:block ">
            Qty
          </h3>
          <h3 className="hidden text-end md:col-start-8 md:col-end-10  md:block">
            Price
          </h3>
          <h3 className="col-start-7 col-end-12 text-end  md:col-start-10 ">
            Item Total
          </h3>
        </div>

        {/* Invoice items content */}
        {invoiceData?.items?.map((item) => (
          // eslint-disable-next-line no-underscore-dangle
          <InvoiceItem item={item} key={item._id} />
        ))}

        <div className="flex flex-col gap-1 py-2">
          <div className="col-span-full flex flex-wrap items-center justify-end gap-2 bg-skin-primary pr-5 text-skin-base   md:gap-2">
            <small>Ex Tax</small>
            <small>
              {' '}
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'GBP',
              }).format(invoiceData?.exVatTotal)}
            </small>
          </div>
          <div className="col-span-full flex flex-wrap items-center justify-end gap-2 bg-skin-primary pr-5 text-skin-base  md:gap-2">
            <small>Tax Rate</small>
            <small>{invoiceData?.taxRate}</small>
          </div>

          <div className="col-span-full flex flex-wrap items-center justify-end gap-2 bg-skin-primary pr-5 text-skin-base  md:gap-2 ">
            <small>Tax</small>
            <small>
              {' '}
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'GBP',
              }).format(invoiceData?.vatAmount)}
            </small>
          </div>

          {/* Total amount due */}
          <div className="col-span-full flex flex-wrap items-center justify-end gap-2 bg-skin-primary pr-5 text-skin-base  ">
            <p>Amount Due</p>
            <p>
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'GBP',
              }).format(invoiceData?.amountDueTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemsSection;
