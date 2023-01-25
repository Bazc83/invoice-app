import { PaymentStatus } from "@/components/PaymentStatus";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useNavigate } from "react-router";

export const InvoicePreview = ({ invoice }) => {
  const { status, id, clientName, amountDueTotal, paymentDue } = invoice;

  const { getDate } = useFormatDate();

  const navigate = useNavigate();

  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
    <div
      onClick={() => showFullInvoice(invoice.id)}
      className={`secondary-bg cursor-pointer rounded-md py-6 px-8 shadow-md lg:grid lg:grid-cols-12 lg:p-8`}
    >
      {/* Invoice id and paymentDue date */}

      <div className="flex justify-between gap-2 pb-4   text-xs sm:text-base   lg:col-start-1 lg:col-end-4 lg:pb-0 ">
        <p className="secondary-text lg:default-text">#{id}</p>
        <p>Due {getDate(paymentDue)}</p>
      </div>

      <p className="pb-4 lg:col-start-5 lg:col-end-8 lg:pb-0 lg:text-center">
        {clientName}{" "}
      </p>

      <div className="flex items-center justify-between gap-2 lg:col-start-10 lg:col-end-13 lg:gap-4 ">
        <p>
          {new Intl.NumberFormat("en", {
            style: "currency",
            currency: "GBP",
          }).format(+amountDueTotal)}
        </p>
        <PaymentStatus status={status} />
      </div>
    </div>
  );
};
