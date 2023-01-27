import { AmountDueTotal } from "@/components/AmountDueTotal";
import { PaymentStatus } from "@/components/PaymentStatus";
import { useFormatDate } from "@/hooks/useFormatDate";
import { InvoiceItems } from "@/pages/Invoice/InvoiceItems";

export const InvoiceMainContent = ({ invoiceData }) => {
  const { getDate } = useFormatDate();

  return (
    <div
      className={`secondary-bg grid grid-cols-1 border border-black p-4 shadow-md text-sm `}
    >
      <div className="grid grid-cols-2 border justify-self-center">
        <h4>
          <span>#</span>
          {invoiceData?.id}
        </h4>

        <p>{invoiceData?.description}</p>
      </div>

      <div>
        <p>Status</p>
        <p>{invoiceData?.paymentStatus}</p>
      </div>

      <div>
        <p>{invoiceData?.senderStreet}</p>
        <p>{invoiceData?.senderCity}</p>
        <p>{invoiceData?.senderPostCode}</p>
        <p>{invoiceData?.senderCountry}</p>
      </div>

      <div>
        <div>
          <p >Invoice Date</p>
          <h3>{invoiceData?.createdAt && getDate(invoiceData?.createdAt)}</h3>
        </div>

        <div>
          <p >Payment Due</p>
          <h3>{invoiceData?.paymentDue && getDate(invoiceData?.paymentDue)}</h3>
        </div>
      </div>

      <div>
        <p>Bill To</p>
        <h3>{invoiceData?.clientName}</h3>

        <div>
          <p>{invoiceData?.clientStreet}</p>
          <p>{invoiceData?.clientCity}</p>
          <p>{invoiceData?.clientPostCode}</p>
          <p>{invoiceData?.clientCountry}</p>
        </div>
      </div>

      <div>
        <p>Sent to</p>
        <h3>{invoiceData?.clientEmail}</h3>
      </div>

      <div>
        <InvoiceItems items={invoiceData?.items} />

        <AmountDueTotal amountDue={invoiceData?.amountDueTotal} />
      </div>
    </div>
  );
};
