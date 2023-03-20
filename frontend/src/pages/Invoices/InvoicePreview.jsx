import { useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useModalStore from '@/context/useModalStore';
import useCheckIfOverdue from '@/hooks/useCheckIfOverdue';
// import usePaymentStatusColor from '@/hooks/usePaymentStatusColor';

export function InvoicePreview({ invoice }) {
  const { status, id, clientName, amountDueTotal, paymentDue } = invoice;

  const showDeleteModal = useModalStore((s) => s.showDeleteModal);

  const { checkIfOverdue, isOverdue, distanceFromToday } =
    useCheckIfOverdue(paymentDue);

  useEffect(() => {
    checkIfOverdue(paymentDue);
  }, [paymentDue, checkIfOverdue]);

  const navigate = useNavigate();

  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const editInvoice = (invoiceId) => {
    navigate(`/editinvoice/${invoiceId}`);
  };

  // const { paymentStatusColor } = usePaymentStatusColor(status);

 
  return (
    <div className={`relative grid grid-cols-2 gap-4 rounded-md    border-2 border-black/20 px-4 py-4 last:rounded-b-md  focus:border-transparent md:grid-cols-[1fr_2fr_2fr_1fr_100px_50px] md:items-center md:gap-4 md:rounded-none md:border-none md:text-start md:odd:bg-skin-primary md:even:bg-skin-secondary lg:gap-8 ${status === "quote" && "border-blue-700  "} ${status === "pending" && !isOverdue && "border-orange-700 "} ${status === "pending" && isOverdue && "border-red-700 "} ${status === "paid"   && "border-green-700 "}`}>


      {/* Id */}
      <p className="col-start-1 row-start-1 md:text-start text-gray-500 dark:text-gray-400">#{id}</p>

      <div className="col-start-2 row-start-1 text-start md:col-start-auto md:row-start-auto md:text-center justify-self-end ">
        {status === 'quote' && <p className='text-gray-500 dark:text-gray-400'>Quote</p>}

        {status !== 'quote' && status === 'paid' && <p className='text-gray-500 dark:text-gray-400'>Paid</p>}

        {status !== 'quote' &&
          status !== 'paid' &&
          distanceFromToday !== 'Today' && (
            <p className={` ${isOverdue && 'text-red-700'}`}>
              <span className="md:hidden">
                {isOverdue ? 'Overdue by ' : 'Due in '}
              </span>
              <span>
                {distanceFromToday.split('')[0] === '-'
                  ? distanceFromToday.split('-')[1]
                  : distanceFromToday}
              </span>
            </p>
          )}

        {status !== 'quote' &&
          status !== 'paid' &&
          distanceFromToday === 'Today' && (
            <p>
              <span className="md:hidden">Due </span>
              <span>{distanceFromToday}</span>
            </p>
          )}
      </div>

      <p className="col-start-1 row-start-2 truncate text-xl font-semibold capitalize text-gray-900 dark:text-white md:col-start-auto md:row-start-auto md:text-start md:text-base">
        {clientName}
      </p>

      <p className="col-start-2 row-start-2 text-end text-xl font-semibold text-gray-900 dark:text-white md:col-start-auto md:row-start-auto md:text-end md:text-base md:font-normal">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(+amountDueTotal)}
      </p>

      {/* <p
        className={` ${paymentStatusColor} col-start-2 row-start-1 w-max justify-self-end rounded-xl px-4 py-1 text-center text-sm font-semibold  capitalize md:col-start-auto md:row-start-auto md:w-auto md:justify-self-auto`}
      >
        {status}
      </p> */}

      <div className="z-20 col-start-1 row-start-3 flex justify-start gap-4 md:col-start-auto md:row-start-auto ">
        <button
          type="button"
          onClick={() => editInvoice(invoice.id)}
          className="hover:scale-110 hover:text-skin-edit text-gray-500 dark:text-gray-400"
        >
          <FaEdit />
        </button>

        <button
          type="button"
          onClick={() => showDeleteModal(invoice.id)}
          className="hover:scale-110 hover:text-skin-danger text-gray-500 dark:text-gray-400"
        >
          <FaTrashAlt />
        </button>
      </div>

      <button
        type="button"
        className="btn | col-start-2 row-start-3 w-max justify-end justify-self-end bg-skin-brand-lighter dark:bg-skin-brand px-4 py-1  font-semibold text-gray-900 "
        onClick={() => showFullInvoice(invoice.id)}
      >
        View
      </button>
    </div>
  );
}

export default InvoicePreview;
