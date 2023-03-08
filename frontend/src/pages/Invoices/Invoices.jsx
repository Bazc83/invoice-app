import { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const [pageNumber, setPageNumber] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [payload, setPayload] = useState({
    page: pageNumber,
    size: itemsPerPage,
    quote: false,
    pending: false,
    paid: false,
  });

  const { isLoading, isError, error, data } = usePaginatedInvoices(payload);

  const pages = new Array(data?.pages).fill(null).map((v, i) => i);

  const deleteModal = useModalStore((s) => s.deleteModal);

  const goToPreviousPage = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
    setPayload((prev) => ({ ...prev, page: Math.max(0, pageNumber - 1) }));
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber + 1 < data?.pages ? pageNumber + 1 : pageNumber);
    setPayload((prev) => ({
      ...prev,
      page: pageNumber + 1 < data?.pages ? pageNumber + 1 : pageNumber,
    }));
  };

  const handlePageChange = (e) => {
    setPageNumber(e.target.value);
    setPayload((prev) => ({ ...prev, page: e.target.value }));
  };

  const changeItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setPayload((prev) => ({ ...prev, size: e.target.value }));
  };
  useEffect(() => {
    dispatch({ type: 'filterInvoices', payload: data?.invoices });
  }, [data?.invoices, dispatch, state.filters]);

  useEffect(() => {
    setPageNumber(0);
  }, [itemsPerPage]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      quote: state?.filters[0].checked,
      pending: state?.filters[1].checked,
      paid: state?.filters[2].checked,
    }));
  }, [state?.filters]);

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

          <div className="flex min-w-full flex-col gap-4 ">
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
                      onChange={changeItemsPerPage}
                    >
                      <option value="5" defaultValue>
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
              {data?.invoices?.length === 0 && <NoInvoices />}

              {/* Invoice preview headers md screen and greater */}
              {data?.invoices?.length > 0 && (
                <div className=" relative hidden grid-cols-2  gap-4 rounded-t-md bg-skin-secondary-darker py-2  px-6   text-center text-sm md:grid md:grid-cols-[1fr_2fr_2fr_1fr_100px_50px] md:items-center md:gap-4 md:text-start lg:gap-8">
                  <p className=" text-start">Ref</p>
                  <p className=" text-center">Payment Due</p>

                  <p className=" text-start">Client Name</p>

                  <p className=" text-end ">Total</p>

                  <p className=" text-start">Status</p>
                </div>
              )}

              {/* Invoice previews  */}
              {data?.invoices?.length > 0 && (
                <div className="flex flex-col gap-4  overflow-auto md:gap-0  ">
                  {/* invoice previews */}
                  {data?.invoices?.length > 0 &&
                    data?.invoices?.map((invoice) => (
                      <InvoicePreview invoice={invoice} key={invoice?.id} />
                    ))}
                </div>
              )}
            </div>

            {data?.pages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 px-6 sm:justify-between md:px-4">
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  className={`${
                    pageNumber - 1 < 0 && 'opacity-0'
                  } hidden items-center gap-1 sm:flex`}
                >
                  <FaChevronLeft /> Prev
                </button>
                <div className="flex gap-2 ">
                  {pages.map((pageIndex) => (
                    <button
                      key={pageIndex}
                      type="button"
                      value={pageIndex}
                      className={`${
                        pageIndex === +pageNumber &&
                        'font-bold text-skin-edit underline underline-offset-4'
                      } relative px-2 py-1 font-semibold  `}
                      onClick={handlePageChange}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToNextPage}
                  className={`${
                    pageNumber + 1 === data?.pages && 'opacity-0'
                  }  hidden items-center gap-1  sm:flex`}
                >
                  Next <FaChevronRight />
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
