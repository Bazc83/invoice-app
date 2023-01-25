import { PaymentStatus } from '@/components/PaymentStatus';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useNavigate } from 'react-router';

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
      className={`secondary-bg rounded-md p-8 sm:p-10 lg:p-8 cursor-pointer lg:grid lg:grid-cols-12 max-w-4xl`}>
      {/* Invoice id and paymentDue date */}

      <div className='flex justify-between text-xs sm:text-base lg:text-inherit secondary-text pb-4 lg:pb-0   gap-2 lg:col-start-1 lg:col-end-4 '>
        <p>#{id}</p>
        <p>Due {getDate(paymentDue)}</p>
      </div>

      <p className='pb-4 lg:pb-0 lg:col-start-5 lg:col-end-8 lg:text-center'>
        {clientName}{' '}
      </p>

      <div className='flex justify-between items-center gap-2 lg:gap-4 lg:col-start-10 lg:col-end-13 '>
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
};
