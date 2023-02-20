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
      className="secondary-bg flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 px-6 py-6 shadow-md dark:border-gray-900 sm:gap-1 md:grid md:grid-cols-[1rem_repeat(10,_1fr)_1rem] md:items-baseline md:justify-center md:gap-2 md:px-2 md:py-6  "
      aria-hidden="true"
    >
      {/* Invoice id and paymentDue date */}
      <div className="grid grid-cols-[1fr_2fr]     gap-1  md:col-start-2    md:col-end-6  ">
        <p className=" text-sm md:text-start md:text-base">#{id}</p>

        {/* Only show payment due date if not paid */}
        {status === 'paid' ? (
          <p className=" text-end text-sm md:text-center md:text-base">
            Invoice Paid
          </p>
        ) : (
          <p className=" text-end text-sm md:text-center md:text-base">
            <span className="md:hidden">Due</span> {getDate(paymentDue)}
          </p>
        )}
      </div>

      <div className="  md:col-start-6 md:col-end-9   md:text-start lg:text-center">
        <p>{clientName} </p>
      </div>
      <div className="flex items-center justify-between  gap-2 md:col-start-9 md:col-end-12 md:w-full md:gap-6">
        <p className="   w-full  lg:text-center">
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(+amountDueTotal)}
        </p>

        <p
          className={`shrink-1 w-[170px] text-center  md:pl-4 ${paymentStatusColor} rounded-md border py-2 px-1 text-sm capitalize md:rounded-none md:border-none md:py-0 md:px-0 md:text-base`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

export default InvoicePreview;
