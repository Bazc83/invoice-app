import { AmountDueTotal } from '@/components/AmountDueTotal';
import { useFormatDate } from '@/hooks/useFormatDate';
import { InvoiceItems } from '@/pages/Invoice/InvoiceItems';

export function InvoiceMainContent({ invoiceData }) {
  const { getDate } = useFormatDate();

  return (
    <div
      className={`secondary-bg flex flex-col gap-6 px-8 py-10 text-sm shadow-md sm:px-10 sm:py-20 sm:text-base `}
    >
      <div className="grid grid-cols-2 gap-2 md:gap-20">
        <div className="flex flex-col gap-1">
          <h1 className="secondary-text text-3xl">Invoice</h1>
          <p className="text-xs sm:text-sm ">#{invoiceData?.id}</p>
        </div>

        <p className="secondary-text self-center text-lg capitalize">
          {invoiceData?.status}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs md:gap-20 md:text-sm lg:text-base">
        <div>
          <p className="secondary-text">Bill To:</p>
          <div>
            <p>{invoiceData?.clientName}</p>
            <p>{invoiceData?.clientStreet}</p>
            <p>{invoiceData?.clientCity}</p>
            <p>{invoiceData?.clientPostCode}</p>
            <p>{invoiceData?.clientCountry}</p>
          </div>
        </div>
        <div>
          <p className="secondary-text">Bill From:</p>
          <div>
            <p>{invoiceData?.companyName}</p>
            <p>{invoiceData?.senderStreet}</p>
            <p>{invoiceData?.senderCity}</p>
            <p>{invoiceData?.senderPostCode}</p>
            <p>{invoiceData?.senderCountry}</p>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-2   gap-2 text-xs md:gap-20 md:text-sm">
        <div className=" flex flex-col">
          <p className="secondary-text">Invoice Ref:</p>
          <p>{invoiceData?.description}</p>
        </div>

        <div className="flex flex-col ">
          <p className="secondary-text">Email Address:</p>
          <p>{invoiceData?.clientEmail}</p>
        </div>
      </div>

      <div className="grid grid-cols-2  gap-2 text-xs md:gap-20 md:text-sm">
        <div className="flex flex-col ">
          <p className="secondary-text">Invoice Date: </p>
          <p>{getDate(invoiceData?.createdAt)}</p>
        </div>

        {invoiceData?.status !== 'paid' && (
          <div className="flex flex-col">
            <p className="secondary-text">Payment Due: </p>
            <p>{getDate(invoiceData?.paymentDue)}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col  text-xs md:text-sm ">
        <p className="secondary-text pb-2">Invoice Items:</p>
        <InvoiceItems items={invoiceData?.items} />
        <AmountDueTotal amountDue={invoiceData?.amountDueTotal} />
      </div>
    </div>
  );
}
export default InvoiceMainContent;
