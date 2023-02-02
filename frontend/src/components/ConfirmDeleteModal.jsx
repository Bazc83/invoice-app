import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { InvoiceContext } from '@/context/InvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

export function ConfirmDeleteModal() {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoiceId);
    navigate('/');
  };

  return (
    <div className="secondary-bg absolute top-[20%] left-[50%] z-50 flex  w-[calc(100%_-_2rem)] max-w-lg -translate-x-[50%] -translate-y-[20%] flex-col items-start justify-center gap-6 rounded-md p-6">
      <h1 className="text-xl font-semibold">Confirm Delete</h1>
      <p className="secondary-text text-lg">
        Are you sure you want to delete invoice {invoiceId}? This action cannot
        be undone
      </p>
      <div className="flex w-full justify-end gap-4 ">
        <button
          type="button"
          className="btn | flex items-center  justify-center gap-2 border border-gray-200 text-gray-200 hover:border-gray-900 hover:bg-gray-900 "
          onClick={() => dispatch({ type: 'hideDeleteModal' })}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn | flex items-center  justify-center gap-2   bg-red-700 text-white hover:bg-red-900"
          onClick={handleDeleteInvoice}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
