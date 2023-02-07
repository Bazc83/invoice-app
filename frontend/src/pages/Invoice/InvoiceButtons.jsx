import { useParams } from 'react-router-dom';

import useModalStore from '@/context/useModalStore';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import { useUpdateInvoice } from '@/hooks/reactQueryHooks/useUpdateInvoice';

export function InvoiceButtons({ showInvoiceControls }) {
  const showDeleteModal = useModalStore((s) => s.showDeleteModal);
  const showEditInvoiceForm = useModalStore((s) => s.showEditInvoiceForm);
  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  const { updateInvoiceMutation } = useUpdateInvoice();

  const setStatus = (statusValue) => {
    updateInvoiceMutation.mutate({
      invoiceId,
      invoiceData: { ...invoiceData, status: statusValue },
    });
  };

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <div
      className={`secondary-bg  flex-col-reverse  items-center justify-center gap-4 rounded-md pt-4 text-sm  md:flex-row md:px-4 md:shadow-none lg:pt-0 ${
        showInvoiceControls ? 'flex' : 'hidden md:flex'
      }`}
    >
      {/* Delete Button */}
      <button
        type="button"
        onClick={showDeleteModal}
        className="btn | w-full border border-red-600 text-red-600  hover:bg-red-600 hover:text-white  sm:max-w-[500px] md:w-auto"
      >
        {isLoading ? '...Deleting' : 'Delete'}
      </button>

      <div className="flex w-full flex-col-reverse items-center justify-center gap-4  sm:max-w-[500px] md:w-auto md:flex-row ">
        {/* Edit Button */}
        <button
          type="button"
          onClick={showEditInvoiceForm}
          className="btn | w-full  border border-gray-900 text-gray-900  hover:border-gray-900 hover:bg-gray-900 hover:text-gray-50  dark:border-gray-50  dark:text-gray-50 dark:hover:border-gray-900 md:w-auto "
        >
          Edit
        </button>

        {/* Draft button */}
        {invoiceData?.status !== 'draft' && (
          <button
            type="button"
            onClick={() => setStatus('draft')}
            className="btn | w-full border border-gray-700 bg-gray-700  text-white hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:text-white md:w-auto "
          >
            Draft
          </button>
        )}

        {/* Pending Button */}
        {invoiceData?.status !== 'pending' && (
          <button
            type="button"
            onClick={() => setStatus('pending')}
            className="btn | w-full   border border-orange-600 bg-orange-600 text-white   hover:border-orange-900 hover:bg-orange-900 md:w-auto "
          >
            Pending
          </button>
        )}

        {/* Paid Button */}
        {invoiceData?.status !== 'paid' && (
          <button
            type="button"
            onClick={() => setStatus('paid')}
            className="btn |  w-full   border border-green-600 bg-green-600 text-white  hover:border-green-900   hover:bg-green-900  md:w-auto "
          >
            Paid
          </button>
        )}
      </div>
    </div>
  );
}

export default InvoiceButtons;
