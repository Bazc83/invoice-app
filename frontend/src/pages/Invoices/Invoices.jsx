import { useContext, useEffect } from 'react';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import InvoicesControlPanel from '@/components/InvoicesControlPanel';
import LoadingAnimation from '@/components/LoadingAnimation';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import useModalStore from '@/context/useModalStore';
import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

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
      <div
        className={`mx-auto h-full  max-w-5xl rounded-md  px-4 pb-10 md:px-6 `}
      >
        <div className=" relative flex h-full flex-col gap-6 px-4 md:gap-8 md:px-0 lg:flex-row ">
          {/* filter checkboxes and add new invoice button */}
          <InvoicesControlPanel state={state} />

          {/* No invoice component */}
          {state.filteredInvoices?.length === 0 && <NoInvoices />}

          {/* Show delete confirmation modal */}
          {deleteModal && <ConfirmDeleteModal />}

          <div
            className={`flex-col gap-4   ${
              state.filteredInvoices?.length === 0 ? 'hidden' : 'flex'
            }`}
          >
            <h2 className="text-2xl ">All Invoices</h2>
            <div className="rounded-md md:border-2 border-skin-secondary-darker">
              {/* Invoice preview headers md screen and greater */}
              {state.filteredInvoices?.length > 0 && (
                <div className=" relative hidden grid-cols-2  gap-4 rounded-t-md bg-skin-secondary-darker py-2  px-6   text-center text-sm md:grid md:grid-cols-[1fr_2fr_2fr_1fr_80px_50px] md:items-center md:gap-4 md:text-start lg:gap-8">
                  <p className=" text-start">Ref</p>
                  <p className=" text-center">Payment Due</p>

                  <p className=" text-start">Client Name</p>

                  <p className=" text-end ">Total</p>

                  <p className=" text-start">Status</p>
                </div>
              )}

              {/* Invoice previews  */}
              <div className="flex flex-col gap-4  overflow-auto md:gap-0  ">
                {/* invoice previews */}
                {invoices?.length > 0 &&
                  state.filteredInvoices?.map((invoice) => (
                    <InvoicePreview invoice={invoice} key={invoice?.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Invoices;
