import { useNavigate } from 'react-router';

import { useFormatDate } from '@/hooks/useFormatDate';
import usePaymentStatusColor from '@/hooks/usePaymentStatusColor';

export function InvoicePreview({ invoice }) {
  const { status, id, clientName, amountDueTotal, paymentDue } = invoice;

  const { getDate } = useFormatDate();

  const navigate = useNavigate();

  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const { paymentStatusColor } = usePaymentStatusColor(status);

  return (
    <div
      onClick={() => showFullInvoice(invoice.id)}
      className="secondary-bg  flex cursor-pointer flex-col gap-2 rounded-md py-4 px-8 shadow-md md:grid md:grid-cols-[1rem_repeat(10,_1fr)_1rem] md:items-baseline md:justify-center md:gap-1 md:px-0 lg:gap-2"
      aria-hidden="true"
    >
      {/* Invoice id and paymentDue date */}
      <div className="flex  items-baseline justify-between    gap-1  md:col-start-2     md:col-end-5">
        <p className="secondary-text md:default-text ">#{id}</p>

        {/* Only show payment due date if not paid */}
        {status === 'paid' ? (
          <p>Invoice Paid</p>
        ) : (
          <p>
            <span className="md:hidden">Due</span> {getDate(paymentDue)}
          </p>
        )}
      </div>

      <div className="  md:col-start-6 md:col-end-9   md:text-start lg:text-center">
        <p>{clientName} </p>
      </div>
      <div className="flex items-center justify-between  gap-2 md:col-start-9 md:col-end-12 md:w-full md:gap-6">
        <p className="   w-full md:text-end lg:text-center">
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(+amountDueTotal)}
        </p>

        <p
          className={`shrink-1 w-[170px] text-center   ${paymentStatusColor} rounded-md border py-2 px-1 text-sm capitalize`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

export default InvoicePreview;
