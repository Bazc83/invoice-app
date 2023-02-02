import { useNavigate } from 'react-router';

import { PaymentStatus } from '@/components/PaymentStatus';
import { useFormatDate } from '@/hooks/useFormatDate';

export function InvoicePreview({ invoice }) {
  const { status, id, clientName, amountDueTotal, paymentDue } = invoice;

  const { getDate } = useFormatDate();

  const navigate = useNavigate();

  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  return (
    <div
      onClick={() => showFullInvoice(invoice.id)}
      className={`secondary-bg cursor-pointer items-baseline justify-center rounded-md py-6 px-8 shadow-md md:grid md:grid-cols-12 md:p-8 md:px-6 `}
      aria-hidden="true"
    >
      {/* Invoice id and paymentDue date */}
      <div className="flex  items-baseline justify-between  gap-2  pb-4 text-xs md:col-start-1  md:col-end-5  md:pb-0 md:text-base lg:col-end-4">
        <p className="secondary-text md:default-text text-xs lg:text-base">
          #{id}
        </p>

        {/* Only show payment due date if not paid */}
        {status === 'paid' ? (
          <p>Invoice Paid</p>
        ) : (
          <p>Due {getDate(paymentDue)}</p>
        )}
      </div>

      <div className=" pb-4 md:col-start-5 md:col-end-9  md:pb-0 md:text-center lg:col-end-8">
        <p>{clientName} </p>
      </div>
      <div className="flex items-center justify-between gap-2  md:col-start-9 md:col-end-13  lg:col-start-10  lg:gap-4">
        <p>
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(+amountDueTotal)}
        </p>
        <PaymentStatus status={status} />
      </div>
    </div>
  );
}

export default InvoicePreview;
