import { useContext, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import InvoicesControlPanel from '@/components/InvoicesControlPanel';
import LoadingAnimation from '@/components/LoadingAnimation';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import useModalStore from '@/context/useModalStore';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

import InvoicesTable from './InvoicesTable';

export function Invoices() {
  const { state, dispatch } = useContext(InvoicesContext);

  const { isLoading, isError, error, data: invoices } = useInvoices();

  const deleteModal = useModalStore((s) => s.deleteModal);

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: invoices });
  }, [invoices, dispatch, state.filters]);

  if (isLoading) return <LoadingAnimation />;
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <Container>
      <div className={`mx-auto h-full  max-w-5xl rounded-md pb-10  md:px-6 `}>
        <h1 className="py-6 text-center text-3xl font-semibold">Invoices</h1>

        <div className=" relative flex h-full flex-col gap-6 px-2 md:px-0 ">
          {/* filter checkboxes and add new invoice button */}
          <InvoicesControlPanel state={state} />

          {/* No invoice component */}
          {state.filteredInvoices?.length === 0 && <NoInvoices />}

          {/* Show delete confirmation modal */}
          {deleteModal && <ConfirmDeleteModal />}

          <div
            className={`flex-col gap-4 rounded-md   bg-skin-secondary ${
              state.filteredInvoices?.length === 0 ? 'hidden' : 'flex'
            }`}
          >
            {/* Invoice preview headers md screen and greater */}
            {state.filteredInvoices?.length > 0 && (
              <InvoicesTable addClass="text-center  md:text-start py-4 px-6  border-b  hidden md:grid font-semibold">
                <p className=" text-center md:text-start">Ref</p>
                <p className=" text-center">Payment Due</p>

                <p className=" text-center">Client Name</p>

                <p className=" text-center">Total</p>

                <p className=" text-center">Status</p>

                <div className="flex justify-end gap-4">
                  <FaEdit className="" />
                  <FaTrashAlt className="" />
                </div>
              </InvoicesTable>
            )}

            {/* Invoice previews  */}
            <div className="flex flex-col gap-6  overflow-auto rounded-md  px-4  py-6 shadow-md md:py-0 md:pb-10 lg:h-[500px]">
              {/* invoice previews */}
              {invoices?.length > 0 &&
                state.filteredInvoices?.map((invoice) => (
                  <InvoicePreview invoice={invoice} key={invoice?.id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Invoices;
