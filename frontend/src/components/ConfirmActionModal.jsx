import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { InvoiceContext } from '@/context/InvoiceContext';
import { useDeleteInvoice } from '@/hooks/reactQueryHooks/useDeleteInvoice';

export function ConfirmActionModal() {
  const { dispatch } = useContext(InvoiceContext);

  const { invoiceId } = useParams();

  const { deleteSelectedInvoice } = useDeleteInvoice();

  const navigate = useNavigate();

  const handleDeleteInvoice = async () => {
    await deleteSelectedInvoice(invoiceId);
    navigate('/');
  };


  const infoRequired = {header: "Confirm Delete", text: `Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone`, cancelAction: "hideDeleteModal", confirmAction: "deleteInvoice", actionPayload: ""}

  return (
    <div className="dark:bg-gray-800 bg-gray-100 absolute top-[20%] left-[50%] z-50 flex  w-[calc(100%_-_2rem)] max-w-lg -translate-x-[50%] -translate-y-[20%] flex-col items-start justify-center gap-6 rounded-md p-6 ">

      <h1 className="text-xl font-semibold">{infoRequired.header}</h1>
      <p className="secondary-text text-lg">
      {infoRequired.text}
      </p>
      <div className="flex w-full justify-end gap-4 ">
        <button
          type="button"
          className="btn | flex items-center  justify-center gap-2 border dark:border-gray-200 dark:text-gray-200 hover:dark:border-gray-900 hover:dark:bg-gray-900  border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900"
          onClick={() => dispatch({ type: infoRequired.cancelAction })}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn | flex items-center  justify-center gap-2   bg-red-700 text-white hover:bg-red-900"
          onClick={handleDeleteInvoice}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmActionModal;
