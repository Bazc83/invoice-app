import { PaymentStatus } from '@/components/PaymentStatus';
import { useFormatDate } from '@/hooks/useFormatDate';
import { useNavigate } from 'react-router';
import styles from './InvoicePreview.module.css';

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
      className={`bg-gray-900  p-8 cursor-pointer sm:flex sm:items-center sm:justify-between max-w-3xl`}>
      <div className='flex justify-between items-baseline gap-2'>
        <p>{clientName}</p>
        <p>
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(+amountDueTotal)}
        </p>
      </div>

      <div className='flex justify-between items-baseline gap-2 pt-6 sm:pt-0'>
        <div className='flex gap-2'>
          <p className='text-sm sm:text-base'>
            <span className='text-purple-500'>#</span>
            {id}
          </p>
          <PaymentStatus status={status} className={'text-sm sm:text-base'} />
        </div>

        <p className='text-sm'>{getDate(paymentDue)}</p>
      </div>
    </div>
  );
};
