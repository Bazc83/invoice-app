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

import InvoiceItem from './InvoiceItem';

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
      className={`relative mx-auto grid max-w-lg grid-cols-1 grid-rows-1 px-6 ${
        (state.showDeleteModal || state.showEditForm) &&
        'before:fixed before:inset-0 before:z-10 before:h-full  before:w-full before:bg-black before:bg-opacity-60 '
      }`}
    >
      {state.showDeleteModal && <ConfirmDeleteModal invoiceId={invoiceId} />}

      {state.showEditForm && <EditInvoiceForm invoiceId={invoiceId} />}

      <div
        className={`primary-bg  flex max-w-3xl flex-col gap-6 py-6 md:px-4 `}
      >
        <div className=" secondary-bg relative flex flex-col rounded-md p-6">
          <div className="flex items-center justify-between ">
            {/* Go back to invoices page link */}
            <GoBackLink linkPath="/invoices" />

            <button
              type="button"
              onClick={() => setShowInvoiceControls((prev) => !prev)}
              className={` relative cursor-pointer rounded-md  py-1 px-1 font-semibold text-gray-800 outline-none transition-colors  dark:text-gray-50  lg:hidden `}
            >
              {showInvoiceControls ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>

          {showInvoiceControls && <InvoiceButtons />}
        </div>

        {/* Invoice main content */}
        <main className="secondary-bg flex flex-col  gap-y-6 pt-8 pb-12 text-sm shadow-md  ">
          {/* Invoice id and invoice payment status */}
          <div className="grid grid-cols-12">
            {/* Header and invoice id */}
            <div className="col-span-5 col-start-2 flex flex-col gap-2">
              <h1 className="text-lg">Invoice</h1>
              <p className="secondary-text  text-xs">#{invoiceData?.id}</p>
            </div>

            <p className="secondary-text col-span-5 col-start-8 self-center text-lg capitalize">
              {invoiceData?.status}
            </p>
          </div>

          {/* Client and sender details */}
          <div className="grid grid-cols-12 text-xs  md:text-sm lg:text-base">
            <div className="col-span-5 col-start-2">
              <p className="secondary-text ">Bill To:</p>
              <div>
                <p>{invoiceData?.clientName}</p>
                <p>{invoiceData?.clientStreet}</p>
                <p>{invoiceData?.clientCity}</p>
                <p>{invoiceData?.clientPostCode}</p>
                <p>{invoiceData?.clientCountry}</p>
              </div>
            </div>
            <div className="col-span-5 col-start-8 ">
              <p className="secondary-text">Bill From:</p>
              <div>
                <p>{invoiceData?.companyName}</p>
                <p>{invoiceData?.senderStreet}</p>
                <p>{invoiceData?.senderCity}</p>
                <p>{invoiceData?.senderPostCode}</p>
                <p>{invoiceData?.senderCountry}</p>
              </div>
            </div>
          </div>

          {/* Invoice description & client's email */}
          <div className="grid grid-cols-12   text-xs  md:text-sm">
            <div className=" col-span-5 col-start-2">
              <p className="secondary-text">Invoice Ref:</p>
              <p>{invoiceData?.description}</p>
            </div>

            <div className="col-span-5 col-start-8 ">
              <p className="secondary-text">Email Address:</p>
              <p>{invoiceData?.clientEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 text-xs  md:text-sm">
            {/* Created at date */}
            <div className="col-span-5 col-start-2">
              <p className="secondary-text">Invoice Date: </p>
              <p>{getDate(invoiceData?.createdAt)}</p>
            </div>

            {/* Invoice payment due date */}
            {invoiceData?.status !== 'paid' && (
              <div className="col-span-5 col-start-8 ">
                <p className="secondary-text">Payment Due: </p>
                <p>{getDate(invoiceData?.paymentDue)}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-12 text-xs md:text-sm ">
            <p className="secondary-text col-span-full col-start-2 pb-2">
              Invoice Items:
            </p>

            {/* Invoice items */}

            <div className="col-span-10 col-start-2 flex flex-col justify-center gap-6 rounded-t-sm bg-gray-200 p-4  text-gray-900 dark:bg-gray-700 dark:text-white ">
              {invoiceData?.items?.map((item) => (
                <InvoiceItem item={item} key={item.itemId} />
              ))}
            </div>

            {/* Total amount due */}
            <div className="col-span-10 col-start-2  flex items-center justify-between rounded-b-sm bg-gray-900 px-4 py-2 text-gray-50">
              <p className="text-xs">Amount Due</p>
              <h2>
                {new Intl.NumberFormat('en', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(invoiceData?.amountDueTotal)}
              </h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Invoice;
