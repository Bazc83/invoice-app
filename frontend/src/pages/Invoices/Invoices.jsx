import { useContext, useEffect, useState } from 'react';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import Filters from '@/components/Filters';
import LoadingAnimation from '@/components/LoadingAnimation';
import { NoInvoices } from '@/components/NoInvoices';
import { InvoicesContext } from '@/context/InvoicesContext';
import useModalStore from '@/context/useModalStore';
// import { useInvoices } from '@/hooks/reactQueryHooks/useInvoices';
import usePaginatedInvoices from '@/hooks/usePaginatedInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

export function Invoices() {
  const { state, dispatch } = useContext(InvoicesContext);

  // const { isLoading, isError, error, data: invoices } = useInvoices();
  const [pageNumber, setPageNumber] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { isLoading, isError, error, data } = usePaginatedInvoices(
    pageNumber,
    itemsPerPage
  );

  const pages = new Array(data?.pages).fill(null).map((v, i) => i);

  const deleteModal = useModalStore((s) => s.deleteModal);

  const goToPreviousPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber + 1 < data?.pages ? pageNumber + 1 : pageNumber);
  };

  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: data?.invoices });
  }, [data?.invoices, dispatch, state.filters]);

  useEffect(() => {
    setPageNumber(0);
  }, [itemsPerPage]);

  if (isLoading) return <LoadingAnimation />;
  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <Container>
      <div
        className={`mx-auto h-full  max-w-5xl rounded-md  px-4 pb-10 md:px-6 `}
      >
        <div className=" relative flex h-full flex-col items-center justify-center gap-6  px-4 md:gap-8 md:px-0 lg:flex-row ">
          {/* Show delete confirmation modal */}
          {deleteModal && <ConfirmDeleteModal />}

          <div className="flex min-w-full flex-col gap-4">
            <div className="flex flex-col items-center justify-between gap-4  md:gap-4">
              <h2 className="text-2xl">All Invoices</h2>

              <div className="flex w-full flex-col items-center gap-6 px-5 md:flex-row md:items-center md:justify-between md:gap-4">
                <Filters />

                <form className=" self-end ">
                  <div className="flex items-center gap-2 text-sm ">
                    <label htmlFor="itemsPerPage">Show</label>
                    <select
                      id="itemsPerPage"
                      name="itemsPerPage"
                      className="py-1 text-sm"
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <option value="5" selected>
                        5
                      </option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>

            <div
              className={` w-full rounded-md border-skin-secondary-darker md:border-2`}
            >
              {/* No invoice component */}
              {state.filteredInvoices?.length === 0 && <NoInvoices />}

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
              {state.filteredInvoices?.length > 0 && (
                <div className="flex flex-col gap-4  overflow-auto md:gap-0  ">
                  {/* invoice previews */}
                  {data?.invoices?.length > 0 &&
                    state.filteredInvoices?.map((invoice) => (
                      <InvoicePreview invoice={invoice} key={invoice?.id} />
                    ))}
                </div>
              )}
            </div>
            {data?.pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button type="button" onClick={goToPreviousPage}>
                  Prev
                </button>

                {pages.map((pageIndex) => (
                  <button
                    key={pageIndex}
                    type="button"
                    value={pageIndex}
                    className={`${
                      pageIndex === +pageNumber &&
                      'font-bold text-skin-edit underline underline-offset-4'
                    } relative px-1 py-1 font-semibold `}
                    onClick={(e) => setPageNumber(e.target.value)}
                  >
                    {pageIndex + 1}
                  </button>
                ))}

                <button type="button" onClick={goToNextPage}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Invoices;
