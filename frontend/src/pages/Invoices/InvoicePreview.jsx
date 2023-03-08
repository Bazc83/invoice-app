import { useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useModalStore from '@/context/useModalStore';
import useCheckIfOverdue from '@/hooks/useCheckIfOverdue';
import usePaymentStatusColor from '@/hooks/usePaymentStatusColor';

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

  const { paymentStatusColor } = usePaymentStatusColor(status);

  return (
    <div className=" relative grid grid-cols-2 gap-4 rounded-md   bg-skin-primary px-6 py-4 last:rounded-b-md odd:bg-skin-secondary md:grid-cols-[1fr_2fr_2fr_1fr_100px_50px] md:items-center  md:gap-4 md:rounded-none md:border-none md:text-start md:odd:bg-skin-primary md:even:bg-skin-secondary lg:gap-8">
      <button
        type="button"
        className="absolute z-10 h-full w-full "
        onClick={() => showFullInvoice(invoice.id)}
        aria-label="Show invoice"
      />

      {/* Id */}
      <p className="col-start-1 row-start-1 md:text-start">
        <span className="text-skin-muted">#</span>
        {id}
      </p>

      {status === 'quote' && (
        <p className="col-start-2 row-start-1 text-end md:col-start-auto md:row-start-auto md:text-center ">
          N/A
        </p>
      )}

      {status !== 'quote' && status === 'paid' && (
        <p className="col-start-2 row-start-1 text-end md:col-start-auto md:row-start-auto md:text-center ">
          Paid
        </p>
      )}

      {status !== 'quote' &&
        status !== 'paid' &&
        distanceFromToday !== 'Today' && (
          <p className="col-start-2 row-start-1 text-end md:col-start-auto md:text-center ">
            <span className="md:hidden">
              {isOverdue ? 'Overdue by ' : 'Due in '}
            </span>
            <span>{distanceFromToday}</span>
          </p>
        )}

      {status !== 'quote' &&
        status !== 'paid' &&
        distanceFromToday === 'Today' && (
          <p className="col-start-2 row-start-1 text-end md:col-start-auto md:text-center ">
            <span className="md:hidden">Due </span>
            <span>{distanceFromToday}</span>
          </p>
        )}

      <p className="col-start-1 row-start-2 truncate capitalize md:col-start-auto md:row-start-auto md:text-start ">
        {clientName}
      </p>

      <p className="col-start-1 row-start-3 md:col-start-auto md:row-start-auto md:text-end ">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(+amountDueTotal)}
      </p>

      <p
        className={` ${paymentStatusColor} col-start-2 row-start-2 w-max justify-self-end rounded-xl px-4 py-1 text-center text-sm font-semibold  capitalize md:col-start-auto md:row-start-auto md:w-auto md:justify-self-auto`}
      >
        {status}
      </p>

      <div className="z-20 col-start-2 row-start-3 flex justify-end gap-4 md:col-start-auto md:row-start-auto ">
        <button
          type="button"
          onClick={() => editInvoice(invoice.id)}
          className="hover:scale-110 hover:text-skin-edit"
        >
          <FaEdit />
        </button>

        <button
          type="button"
          onClick={() => showDeleteModal(invoice.id)}
          className="hover:scale-110 hover:text-skin-danger"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default InvoicePreview;
