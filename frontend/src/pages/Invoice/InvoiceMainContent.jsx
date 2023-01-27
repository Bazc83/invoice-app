import { AmountDueTotal } from "@/components/AmountDueTotal";
import { useFormatDate } from "@/hooks/useFormatDate";
import { InvoiceItems } from "@/pages/Invoice/InvoiceItems";

export const InvoiceMainContent = ({ invoiceData }) => {
  const { getDate } = useFormatDate();

  return (
    <div
      className={`secondary-bg grid grid-cols-1 gap-4 border border-black p-8  shadow-md text-sm sm:text-base md:p-10`}
    >
      <div className="flex justify-between ">
        <div>
          <p>Company Name</p>
          <p>{invoiceData?.senderStreet}</p>
          <p>{invoiceData?.senderCity}</p>
          <p>{invoiceData?.senderPostCode}</p>
          <p>{invoiceData?.senderCountry}</p>
        </div>

        <h1 className="text-2xl">Invoice</h1>
      </div>

      <div className="flex justify-between ">
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

        <div className="flex flex-col ">
          <div className="flex flex-col justify-between gap-2">
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

      <div className="flex justify-between ">
        <div className="flex flex-col">
          <p className="secondary-text">Invoice Reference:</p>
          <p>{invoiceData?.description}</p>
        </div>

        <div className="flex flex-col">
          <p className="secondary-text">Sent to</p>
          <h3>{invoiceData?.clientEmail}</h3>
        </div>
      </div>
      <div>
        <InvoiceItems items={invoiceData?.items} />

        <AmountDueTotal amountDue={invoiceData?.amountDueTotal} />
      </div>
    </div>
  );
};
