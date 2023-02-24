import { useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { GoBackLink } from '@/components/GoBackLink';
import useModalStore from '@/context/useModalStore';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import useFormatDate from '@/hooks/useFormatDate';

import ItemsSection from './ItemsSection';

export function Invoice() {
  const showDeleteModal = useModalStore((s) => s.showDeleteModal);
  const deleteModal = useModalStore((s) => s.deleteModal);
  const hideAllModals = useModalStore((s) => s.hideAllModals);

  const { getDate } = useFormatDate();

  const { invoiceId } = useParams();

  const navigate = useNavigate();

  const handleEditInvoice = (invoiceIdVal) =>
    navigate(`/editinvoice/${invoiceIdVal}`);

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
    remove,
  } = useFilterInvoiceById(invoiceId);

  const handleDelete = (invoiceIdValue) => {
    showDeleteModal(invoiceIdValue);
  };

  // Clears from useQuery cache on unmount
  useEffect(
    () => () => remove(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    hideAllModals();
  }, [hideAllModals]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{`An error has occurred: ${error.message}`}</div>;

  return (
    <div className="primary-bg  relative mx-auto grid  max-w-3xl grid-cols-1 grid-rows-1 gap-6  p-6  ">
      {/* Show delete confirmation modal */}
      {deleteModal && <ConfirmDeleteModal />}

      {/* invoice conrols */}
      <div className="noPrint | secondary-bg relative flex  flex-col items-center justify-between  gap-4 rounded-md  py-6 px-8 text-sm sm:flex-row">
        {/* Go back to invoices page link */}
        <GoBackLink linkPath="/invoices" />

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleDelete(invoiceId)}
            className="btn border border-red-600 text-red-600  hover:bg-red-600 hover:text-white  "
          >
            Delete
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => handleEditInvoice(invoiceId)}
            className="btn   border border-gray-900 text-gray-900    hover:bg-gray-900 hover:text-gray-50 dark:border-gray-50  dark:text-gray-50  hover:dark:bg-gray-50 hover:dark:text-gray-900"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Invoice main content */}
      <main className="secondary-bg print | relative flex h-full  flex-col gap-y-4 pt-8 pb-12  text-sm shadow-md">
        {/* Print Button */}
        <button
          type="button"
          onClick={() => window.print()}
          className="group/printIcon absolute top-6 right-6 rounded-full bg-gray-200 bg-opacity-80 p-2 hover:bg-opacity-100 dark:bg-gray-50 dark:bg-opacity-80 hover:dark:bg-opacity-100 print:hidden "
        >
          <FaPrint className="text-3xl text-gray-700 " />

          <span className="absolute top-0 right-14 hidden rounded-md bg-gray-200 px-2    py-1 group-hover/printIcon:block dark:bg-gray-50  dark:text-gray-700">
            Print
          </span>
        </button>
        {/* Invoice id and invoice payment status */}
        <div className="grid grid-cols-12">
          {/* Header and invoice id */}
          <div className="col-span-5 col-start-2 flex flex-col gap-2">
            <h1 className="text-lg md:text-xl lg:text-2xl ">Invoice</h1>
            <p className="secondary-text  text-sm lg:text-base  ">
              #{invoiceData?.id}
            </p>
          </div>

          <p className="secondary-text col-span-5 col-start-8 self-center text-lg capitalize md:text-xl lg:text-2xl ">
            {invoiceData?.status}
          </p>
        </div>

        {/* Invoice Dates */}
        <div className="grid grid-cols-12 text-sm lg:text-base">
          {/* Created at date */}
          <div className="col-span-5 col-start-2 flex flex-col flex-wrap gap-2 md:flex-row">
            <p className="secondary-text ">Invoice Date: </p>
            <p className="">{getDate(invoiceData?.createdAt)}</p>
          </div>

          {/* Invoice payment due date */}
          {invoiceData?.status !== 'paid' && (
            <div className="col-span-5 col-start-8 flex flex-col flex-wrap gap-2 md:flex-row">
              <p className="secondary-text ">Payment Due: </p>
              <p className="">{getDate(invoiceData?.paymentDue)}</p>
            </div>
          )}
        </div>

        {/* Client and sender details */}
        <div className="grid grid-cols-12 text-sm lg:text-base">
          <div className="col-span-5 col-start-2">
            <p className="secondary-text  ">Bill To:</p>
            <div className="md:pl-2">
              <p>{invoiceData?.clientName}</p>
              <p>{invoiceData?.clientStreet}</p>
              <p>{invoiceData?.clientCity}</p>
              <p>{invoiceData?.clientPostCode}</p>
              <p>{invoiceData?.clientCountry}</p>
            </div>
          </div>
          <div className="col-span-5 col-start-8 ">
            <p className="secondary-text">Bill From:</p>
            <div className="md:pl-2">
              <p>{invoiceData?.companyName}</p>
              <p>{invoiceData?.senderStreet}</p>
              <p>{invoiceData?.senderCity}</p>
              <p>{invoiceData?.senderPostCode}</p>
              <p>{invoiceData?.senderCountry}</p>
            </div>
          </div>
        </div>

        {/* Invoice description & client's email */}
        <div className="grid grid-cols-12   gap-2  text-sm md:gap-0 lg:text-base">
          <div className=" col-span-full col-start-2  md:col-span-5 md:col-start-2 ">
            <p className="secondary-text">Invoice Ref:</p>
            <p className="md:pl-2">{invoiceData?.description}</p>
          </div>

          <div className="col-span-full col-start-2  md:col-span-5 md:col-start-8 ">
            <p className="secondary-text">Email Address:</p>
            <p className="md:pl-2">{invoiceData?.clientEmail}</p>
          </div>
        </div>

        {/* Items section */}
        <ItemsSection invoiceData={invoiceData} />
      </main>
    </div>
  );
}

export default Invoice;
