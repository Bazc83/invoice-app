import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useModalStore from '@/context/useModalStore';
import { useFormatDate } from '@/hooks/useFormatDate';
import usePaymentStatusColor from '@/hooks/usePaymentStatusColor';

export function InvoicePreview({ invoice }) {
  const { status, id, clientName, amountDueTotal, paymentDue } = invoice;

  const showDeleteModal = useModalStore((s) => s.showDeleteModal);
  const { getDate } = useFormatDate();

  const navigate = useNavigate();

  const showFullInvoice = (invoiceId) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const editInvoice = (invoiceId) => {
    navigate(`/editinvoice/${invoiceId}`);
  };

  const { paymentStatusColor } = usePaymentStatusColor(status);

  return (
    <div className=" relative grid grid-cols-2 gap-4 bg-skin-secondary   py-6 odd:bg-skin-secondary-darker md:grid-cols-[1fr_2fr_2fr_1fr_80px_50px] md:items-center  md:gap-4 md:text-start lg:gap-8 px-6 rounded-md md:rounded-none ">
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

      {/* payment due date */}
      {/* Only show payment due date if not paid */}
      {status === 'paid' ? (
        <p className="col-start-2 row-start-1 text-end md:col-start-auto md:row-start-auto md:text-center ">
          Paid
        </p>
      ) : (
        <p className="col-start-2 row-start-1 text-end md:col-start-auto md:text-center ">
          <span className="md:hidden">Due</span> {getDate(paymentDue)}
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
        className={` ${paymentStatusColor} col-start-2 row-start-2 text-end capitalize md:col-start-auto md:row-start-auto md:text-start `}
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
