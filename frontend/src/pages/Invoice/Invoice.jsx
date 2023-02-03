import { useContext, useEffect, useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useParams } from 'react-router-dom';

import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { EditInvoiceForm } from '@/components/EditInvoiceForm';
import { GoBackLink } from '@/components/GoBackLink';
import { InvoiceContext } from '@/context/InvoiceContext';
import { useFilterInvoiceById } from '@/hooks/reactQueryHooks/useFilterInvoiceById';
import useFormatDate from '@/hooks/useFormatDate';
import { InvoiceButtons } from '@/pages/Invoice/InvoiceButtons';

import ItemsSection from './ItemsSection';

export function Invoice() {
  const { getDate } = useFormatDate();

  const { state, dispatch } = useContext(InvoiceContext);

  const [showInvoiceControls, setShowInvoiceControls] = useState(false);

  const { invoiceId } = useParams();

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useFilterInvoiceById(invoiceId);

  useEffect(() => () => dispatch({ type: 'resetInvoice' }), [dispatch]);

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (

    <div
      className={`relative mx-auto grid max-w-2xl grid-cols-1 grid-rows-1  px-6 ${
        (state.showDeleteModal || state.showEditForm) &&
        'before:fixed before:inset-0 before:z-10 before:h-full  before:w-full before:bg-black before:bg-opacity-60 '
      }`}
    >
      {state.showDeleteModal && <ConfirmDeleteModal invoiceId={invoiceId} />}

      {state.showEditForm && <EditInvoiceForm invoiceId={invoiceId} />}
      {/* invoice background */}
      <div className="primary-bg  flex  flex-col gap-4 py-6 ">
        {/* invoice wrapper */}
        <div className=" secondary-bg relative flex flex-col rounded-md  p-6  md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between ">
            {/* Go back to invoices page link */}
            <GoBackLink linkPath="/invoices" />

            <button
              type="button"
              onClick={() => setShowInvoiceControls((prev) => !prev)}
              className={` relative cursor-pointer rounded-md  py-1 px-1 font-semibold text-gray-800 outline-none transition-colors  dark:text-gray-50  md:hidden `}
            >
              {showInvoiceControls ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>

          <InvoiceButtons showInvoiceControls={showInvoiceControls} />
        </div>

        {/* Invoice main content */}
        <main className="secondary-bg flex h-full flex-col  gap-y-4 pt-8 pb-12 text-sm  shadow-md">
          {/* Invoice id and invoice payment status */}
          <div className="grid grid-cols-12">
            {/* Header and invoice id */}
            <div className="col-span-5 col-start-2 flex flex-col gap-2">
              <h1 className="text-lg md:text-xl lg:text-2xl">Invoice</h1>
              <p className="secondary-text  text-sm lg:text-base">
                #{invoiceData?.id}
              </p>
            </div>

            <p className="secondary-text col-span-5 col-start-8 self-center text-lg capitalize md:text-xl lg:text-2xl">
              {invoiceData?.status}
            </p>
          </div>

          {/* Invoice Dates */}
          <div className="grid grid-cols-12 text-sm lg:text-base">
            {/* Created at date */}
            <div className="col-span-5 col-start-2 flex flex-col flex-wrap gap-2 md:flex-row">
              <p className="secondary-text">Invoice Date: </p>
              <p>{getDate(invoiceData?.createdAt)}</p>
            </div>

            {/* Invoice payment due date */}
            {invoiceData?.status !== 'paid' && (
              <div className="col-span-5 col-start-8 flex flex-col flex-wrap gap-2 md:flex-row">
                <p className="secondary-text">Payment Due: </p>
                <p>{getDate(invoiceData?.paymentDue)}</p>
              </div>
            )}
          </div>

          {/* Client and sender details */}
          <div className="grid grid-cols-12 text-sm lg:text-base">
            <div className="col-span-5 col-start-2">
              <p className="secondary-text ">Bill To:</p>
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
          <div className="grid grid-cols-12   gap-2  md:gap-0 text-sm lg:text-base">
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
    </div>
  );
}

export default Invoice;
