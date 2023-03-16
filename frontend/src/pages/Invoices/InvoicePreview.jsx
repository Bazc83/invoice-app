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
    <div className=" relative grid grid-cols-2 gap-4 rounded-md    border-2 border-black/20 px-4 py-4 last:rounded-b-md  focus:border-transparent md:grid-cols-[1fr_2fr_2fr_1fr_100px_50px] md:items-center md:gap-4 md:rounded-none md:border-none md:text-start md:odd:bg-skin-primary md:even:bg-skin-secondary lg:gap-8 ">
      <button
        type="button"
        className="absolute z-50 h-full w-2/3  py-2 px-5 
        after:absolute after:inset-0 after:z-0 after:flex after:h-full after:w-full after:items-center after:justify-center after:bg-skin-brand after:text-skin-brand-text after:opacity-0 after:transition-opacity after:duration-300  after:ease-in-out after:content-['View'] hover:after:opacity-100 focus:outline-none focus:ring-2 focus:after:opacity-100 active:ring-2 active:after:bg-opacity-100 after:font-semibold after:text-lg" 
        onClick={() => showFullInvoice(invoice.id)}
        aria-label="Show invoice"
      />

      {/* Id */}
      <p className="col-start-1 row-start-1 md:text-start">#{id}</p>

      {status === 'quote' && (
        <p className="col-start-1 row-start-3 text-start md:col-start-auto md:row-start-auto md:text-center ">
          N/A
        </p>
      )}

      {status !== 'quote' && status === 'paid' && (
        <p className="col-start-1 row-start-3 text-start md:col-start-auto md:row-start-auto md:text-center ">
          Paid
        </p>
      )}

      {status !== 'quote' &&
        status !== 'paid' &&
        distanceFromToday !== 'Today' && (
          <p className={`col-start-1 row-start-3 text-start md:col-start-auto md:row-start-auto md:text-center ${isOverdue && "text-skin-overdue"}`}>
            <span className="md:hidden">
              {isOverdue ? 'Overdue by ' : 'Due in '}
            </span>
            <span>{distanceFromToday.split("")[0] === "-"? distanceFromToday.split("-")[1] : distanceFromToday}</span>
          </p>
        )}

      {status !== 'quote' &&
        status !== 'paid' &&
        distanceFromToday === 'Today' && (
          <p className="col-start-1 row-start-3 text-start md:col-start-auto md:row-start-auto md:text-center ">
            <span className="md:hidden">Due </span>
            <span>{distanceFromToday}</span>
          </p>
        )}

      <p className="col-start-1 row-start-2 truncate text-xl font-semibold capitalize text-skin-brand-text md:col-start-auto md:row-start-auto md:text-start md:text-base">
        {clientName}
      </p>

      <p className="col-start-2 row-start-2 text-end text-xl font-semibold text-skin-brand-text md:col-start-auto md:row-start-auto md:text-end md:text-base md:font-normal">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(+amountDueTotal)}
      </p>

      <p
        className={` ${paymentStatusColor} col-start-2 row-start-1 w-max justify-self-end rounded-xl px-4 py-1 text-center text-sm font-semibold  capitalize md:col-start-auto md:row-start-auto md:w-auto md:justify-self-auto`}
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
