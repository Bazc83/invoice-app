import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import Container from '@/components/Container';
import Filters from '@/components/Filters';
import LoadingAnimation from '@/components/LoadingAnimation';
import { NoInvoices } from '@/components/NoInvoices';
import useModalStore from '@/context/useModalStore';
import usePaginatedInvoices from '@/hooks/usePaginatedInvoices';
import { InvoicePreview } from '@/pages/Invoices/InvoicePreview';

export function Invoices() {
  const [payload, setPayload] = useState({
    pageNumber: 0,
    itemsPerPage: 5,
    quote: false,
    pending: false,
    paid: false,
    sortBy: 'dateDescending',
  });

  const { isLoading, isError, error, data } = usePaginatedInvoices(payload);

  const pages = new Array(data?.pages).fill(null).map((v, i) => i);

  const deleteModal = useModalStore((s) => s.deleteModal);

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
        <div className=" relative flex h-full flex-col items-center justify-center gap-6  px-4 md:gap-8 md:px-0 lg:flex-row ">
          {/* Show delete confirmation modal */}
          {deleteModal && <ConfirmDeleteModal />}

          <div className="flex min-w-full flex-col gap-4 ">
            <div className="flex flex-col items-center justify-between gap-4  md:gap-4">
              <h2 className="text-2xl">All Invoices</h2>

              <div className="flex w-full flex-col items-center gap-6 px-5 md:flex-row md:items-center md:gap-2 flex-wrap md:justify-between">

                <Filters payload={payload} handleChecked={handleChecked} />

                <div className='flex gap-4 items-center  w-full md:w-auto  justify-end flex-wrap'>
                  <form className=" self-end ">
                    <div className="flex items-center gap-2 text-sm ">
                      <label htmlFor="itemsPerPage">Results per page</label>
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

                  <form className=" self-end ">
                    <div className="flex items-center gap-2 text-sm ">
                      <label htmlFor="sortBy">Sort by</label>
                      <select
                        id="sortBy"
                        name="sortBy"
                        className="py-1 text-sm"
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
