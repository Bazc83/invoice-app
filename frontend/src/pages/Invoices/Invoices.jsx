import { useEffect, useState } from 'react';
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaFilter,
} from 'react-icons/fa';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import Filters from '@/components/Filters';
import LoadingAnimation from '@/components/LoadingAnimation';
import { NoInvoices } from '@/components/NoInvoices';
import useModalStore from '@/context/useModalStore';
import usePaginatedInvoices from '@/hooks/usePaginatedInvoices';
import useWindowResize from '@/hooks/useWindowResize';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

export function Invoices() {
  const initialPayloadState = {
    pageNumber: 0,
    itemsPerPage: 5,
    quote: false,
    pending: false,
    paid: false,
    sortBy: 'dateDescending',
  };

  const [payload, setPayload] = useState(initialPayloadState);

  const { isLoading, isError, error, data } = usePaginatedInvoices(payload);

  const pages = new Array(data?.pages).fill(null).map((v, i) => i);

  const deleteModal = useModalStore((s) => s.deleteModal);

  const [showFilters, setShowFilters] = useState(false);

  const [showFilterByStatus, setShowFilterByStatus] = useState(false);

  const { windowResizing } = useWindowResize();

  const clearFilters = () => {
    setPayload((prev) => ({
      ...prev,
      paid: false,
      pending: false,
      quote: false,
    }));

    setShowFilters(false);
  };
  const goToPreviousPage = () => {
    setPayload((prev) => ({
      ...prev,
      pageNumber: Math.max(0, prev.pageNumber - 1),
    }));
  };

  const goToNextPage = () => {
    setPayload((prev) => ({
      ...prev,
      pageNumber:
        prev.pageNumber + 1 < data?.pages
          ? prev.pageNumber + 1
          : prev.pageNumber,
    }));
  };

  const handlePageChange = (e) => {
    setPayload((prev) => ({ ...prev, pageNumber: +e.target.value }));
  };

  const changeItemsPerPage = (e) => {
    setPayload((prev) => ({ ...prev, itemsPerPage: e.target.value }));
  };

  const changeSortBy = (e) => {
    setPayload((prev) => ({ ...prev, sortBy: e.target.value }));
  };

  useEffect(() => {
    setPayload((prev) => ({ ...prev, pageNumber: 0 }));
  }, [payload.itemsPerPage, payload.quote, payload.paid, payload.pending]);

  useEffect(() => {
    if (showFilters) {
      setShowFilters(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowResizing]);

  const handleChecked = (filterVal) => {
    setPayload((prev) => ({
      ...prev,
      [filterVal]: !prev[filterVal],
    }));
  };

  if (isLoading) return <LoadingAnimation />;
  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <Container>
      <div
        className={`mx-auto h-full  max-w-5xl rounded-md  px-4 pb-10 md:px-6 `}
      >
        <div className=" flex h-full flex-col items-center justify-center gap-6  px-4 md:gap-8 md:px-0 lg:flex-row ">
          {/* Show delete confirmation modal */}
          {deleteModal && <ConfirmDeleteModal />}

          <div className=" relative flex min-w-full flex-col gap-6">
            <div className="flex flex-col items-center justify-between gap-4  md:gap-4 ">
              <h2 className="pb-2 text-2xl">All Invoices</h2>

              <div className="flex w-full  flex-col gap-6  pb-4 md:flex-row md:items-center md:justify-between md:gap-2 md:pb-0">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="btn flex items-center justify-center gap-1 border-2 border-skin-fill py-1 px-4 text-sm text-skin-muted hover:bg-skin-secondary hover:text-skin-base"
                >
                  <FaFilter />
                  Filters
                </button>

                {/* Results per page and sort by date */}
                <div className="flex  flex-wrap items-center  gap-4 sm:justify-between  md:w-auto md:flex-row  md:justify-end xs:justify-center ">
                  <form className=" w-full self-end md:w-auto">
                    <div className="flex flex-wrap gap-2">
                      <label htmlFor="itemsPerPage">Results per page</label>
                      <select
                        id="itemsPerPage"
                        name="itemsPerPage"
                        className="w-full py-1 text-sm md:w-auto "
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

                  <form className=" w-full self-end md:w-auto">
                    <div className="flex flex-wrap gap-2">
                      <label htmlFor="sortBy">Sort by</label>
                      <select
                        id="sortBy"
                        name="sortBy"
                        className="w-full py-1 text-sm md:w-auto"
                        onChange={changeSortBy}
                      >
                        <option value="dateDesc" defaultValue>
                          Date desc
                        </option>
                        <option value="dateAsc">Date Asc</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className=" w-full rounded-md border-skin-secondary-darker md:border-2">
              {/* No invoice component */}
              {data?.invoices?.length === 0 && <NoInvoices />}

              {/* Invoice preview headers md screen and greater */}
              {data?.invoices?.length > 0 && (
                <div className="  hidden grid-cols-2  gap-4 rounded-t-md bg-skin-secondary-darker py-2  px-6   text-center text-sm md:grid md:grid-cols-[1fr_2fr_2fr_1fr_100px_50px] md:items-center md:gap-4 md:text-start lg:gap-8">
                  <p className=" text-start">Ref</p>
                  <p className=" text-center">Payment Due</p>

                  <p className=" text-start">Client Name</p>

                  <p className=" text-end ">Total</p>

                  <p className=" text-start">Status</p>
                </div>
              )}

              {/* fitlers */}
              <div
                className={`${
                  showFilters && 'translate-x-full md:translate-x-80'
                } fixed top-0 -left-full z-50 flex h-full w-full min-w-max flex-col justify-between gap-4  border-r-2 border-r-black border-opacity-5 bg-skin-primary px-8 py-8 shadow-md transition-transform duration-300 ease-in-out md:top-[72px] md:-left-80 md:h-[calc(100%_-_72px)] md:w-80`}
              >
                <div className="flex flex-col gap-4 ">
                  <h2 className="border-b-2 border-b-black border-opacity-30 pb-4 text-3xl font-semibold">
                    Filters
                  </h2>

                  <div className=" flex flex-col gap-4 border-b-2 border-b-black border-opacity-30 pb-4">
                    <button
                      onClick={() => setShowFilterByStatus((prev) => !prev)}
                      type="button"
                      className="flex w-full items-center justify-between font-semibold"
                    >
                      Filter by status{' '}
                      {showFilterByStatus ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {showFilterByStatus && (
                      <Filters
                        payload={payload}
                        handleChecked={handleChecked}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4 pb-4">
                  <button
                    type="button"
                    className="btn bg-skin-brand py-2 px-4 text-white "
                    onClick={() => setShowFilters((prev) => !prev)}
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className="btn bg-skin-brand-lighter py-2 px-4"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

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
                {/* Previous page */}
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  className={`${
                    payload.pageNumber - 1 < 0 && 'opacity-0'
                  } hidden items-center gap-1 sm:flex`}
                >
                  <FaChevronLeft /> Prev
                </button>

                {/* pages as "Page 1 of 4" */}
                {/* <div>
                  Page {payload.pageNumber + 1} of {pages.length}
                </div> */}

                {/* Page numbers */}
                <div className="flex gap-2 ">
                  {pages.map((pageIndex) => (
                    <button
                      key={pageIndex}
                      type="button"
                      value={pageIndex}
                      className={`${
                        pageIndex === +payload.pageNumber &&
                        'font-bold text-skin-edit underline underline-offset-4'
                      } relative px-2 py-1 font-semibold  `}
                      onClick={handlePageChange}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}
                </div>

                {/* Next Page */}
                <button
                  type="button"
                  onClick={goToNextPage}
                  className={`${
                    payload.pageNumber + 1 === data?.pages && 'opacity-0'
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
