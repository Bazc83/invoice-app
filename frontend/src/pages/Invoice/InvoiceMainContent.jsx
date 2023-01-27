import { AmountDueTotal } from "@/components/AmountDueTotal";
import { useFormatDate } from "@/hooks/useFormatDate";
import { InvoiceItems } from "@/pages/Invoice/InvoiceItems";

export const InvoiceMainContent = ({ invoiceData }) => {
  const { getDate } = useFormatDate();

  return (
    <div
      className={`secondary-bg flex flex-col gap-6 px-8 py-10 text-sm shadow-md sm:px-10 sm:py-20 sm:text-base `}
    >
      <div className="flex items-center justify-between gap-2 text-xs sm:text-sm md:text-base">
        <div>
          <p>Company Name</p>
          <p>{invoiceData?.senderStreet}</p>
          <p>{invoiceData?.senderCity}</p>
          <p>{invoiceData?.senderPostCode}</p>
          <p>{invoiceData?.senderCountry}</p>
        </div>

        <h1 className="text-2xl">Invoice</h1>
      </div>

      <div className="flex justify-between gap-2 text-xs sm:text-sm ">
        <div>
          <p className="secondary-text">Bill To</p>

          <div>
            <p>{invoiceData?.clientName}</p>
            <p>{invoiceData?.clientStreet}</p>
            <p>{invoiceData?.clientCity}</p>
            <p>{invoiceData?.clientPostCode}</p>
            <p>{invoiceData?.clientCountry}</p>
          </div>
        </div>

        <div className="flex flex-col  ">
          <div className="flex flex-col justify-between gap-1">
            <div className="flex flex-col ">
              <p className="secondary-text">Invoice Id:</p>
              <p>#{invoiceData?.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="secondary-text">Invoice Date: </p>
              <p>{getDate(invoiceData?.createdAt)}</p>
            </div>

            {invoiceData?.status !== "paid" && (
              <div className="flex flex-col">
                <p className="secondary-text">Payment Due: </p>
                <p>{getDate(invoiceData?.paymentDue)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2 text-xs sm:text-sm">
        <div className="flex flex-col">
          <p className="secondary-text">Invoice Reference:</p>
          <p>{invoiceData?.description}</p>
        </div>

        <div className="flex flex-col">
          <p className="secondary-text">Email Address:</p>
          <p>{invoiceData?.clientEmail || "awaiting Email"}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 text-xs sm:text-sm">
          <p className="secondary-text">Invoice Items:</p>
          <InvoiceItems items={invoiceData?.items} />
        </div>
        <AmountDueTotal amountDue={invoiceData?.amountDueTotal} />
      </div>
    </div>
  );
};
