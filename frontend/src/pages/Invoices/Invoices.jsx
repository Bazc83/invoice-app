import { useContext, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import InvoicesControlPanel from '@/components/InvoicesControlPanel';
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

  if (isLoading) return 'Loading...';
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <Container>
      <div
        className={`mx-auto h-full  max-w-5xl rounded-md pb-10  md:px-6 `}
      >
        <h1 className="py-6 text-center text-3xl font-semibold">Invoices</h1>
        <div className=" relative flex h-full flex-col gap-6 px-6 md:px-0 ">

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
                <p className="">Ref</p>
                <p className="">Payment Due</p>

                <p className="">Client Name</p>

                <p className="text-center ">Total</p>

                <p className="">Status</p>

                <div className='flex gap-4 justify-end' >
                  <FaEdit className="" />
                  <FaTrashAlt className="" />
                </div>
              </InvoicesTable>
            )}

            {/* Invoice previews  */}
            <div className="flex flex-col gap-6  overflow-auto lg:h-[500px]  px-3 pt-4 pb-10 rounded-md">
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
