import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import useModalStore from '@/context/useModalStore';
import { useFormatDate } from '@/hooks/useFormatDate';
import usePaymentStatusColor from '@/hooks/usePaymentStatusColor';

import InvoicesTable from './InvoicesTable';

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
    <InvoicesTable addClass="md:text-start md:py-4 shadow-md px-6 py-6 md:px-2 bg-skin-primary rounded-md ">
      <button
        type="button"
        className="absolute z-10 h-full w-full "
        onClick={() => showFullInvoice(invoice.id)}
        aria-label="Show invoice"
      />

      {/* Id */}
      <p className="col-start-1 row-start-1    md:text-center">
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

      <p className="col-start-1 row-start-2 capitalize md:col-start-auto md:row-start-auto md:text-center ">
        {clientName}
      </p>

      <p className="col-start-1 row-start-3 md:col-start-auto md:row-start-auto md:text-center ">
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'GBP',
        }).format(+amountDueTotal)}
      </p>

      <p
        className={` ${paymentStatusColor} col-start-2 row-start-2 text-end capitalize md:col-start-auto md:row-start-auto md:text-center `}
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
    </InvoicesTable>
  );
}

export default InvoicePreview;
