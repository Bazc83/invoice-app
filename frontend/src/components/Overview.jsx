import { useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import useGetUserQuotes from '@/hooks/reactQueryHooks/useGetUserQuotes';

function Overview() {
  const { data: quotesData } = useGetUserQuotes();

  const [quotesTotal, setQuotesTotal] = useState('0.00');

  const [showOverview, setShowOverview] = useState(true);

  useMemo(() => {
    if (quotesData?.length > 0) {
      setQuotesTotal(
        quotesData
          .reduce((acc, curr) => acc + +curr.amountDueTotal, 0)
          .toFixed(2)
      );
    }
  }, [setQuotesTotal, quotesData]);

  return (
    <div className=" w-full  bg-skin-brand md:py-4">
      <div className="flex items-center justify-between border-b-2 border-b-skin-line px-6 py-2 md:hidden">
        <p className="text-skin-inverted font-semibold">Overview</p>

        <button
          type="button"
          onClick={() => setShowOverview((prev) => !prev)}
          className="relative  grid grid-cols-1 grid-rows-1"
        >
          <FaChevronUp
            className={`text-skin-inverted col-span-full row-span-full transition-opacity duration-200 ease-in-out ${

              showOverview ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <FaChevronDown
            className={`text-skin-inverted col-span-full row-span-full transition-opacity duration-200 ease-in-out ${
              showOverview ? 'opacity-0' : 'opacity-100'
              
            }`}
          />
        </button>
      </div>



      <div
        className={` ${
          showOverview ? 'h-full ' : 'h-0 '
        } mx-auto flex max-w-5xl flex-col justify-between  overflow-hidden md:flex-row   md:h-auto md:gap-4 transition-all duration-200 ease-in-out`}
      >
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-b-skin-line  px-6 py-4   last:border-none  md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="font-semibold text-skin-brand-darker">Quotes</h3>
            <p className="text-skin-inverted  text-2xl font-semibold">
              £{quotesTotal}
            </p>
          </div>

          <button
            type="button"
            className="btn | w-min min-w-max justify-self-end rounded-md  bg-skin-brand-darker  py-1 px-2  text-sm font-semibold text-skin-brand"
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-b-skin-line  px-6 py-4  last:border-none  md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="font-semibold text-skin-brand-darker">Pending</h3>
            <p className="text-skin-inverted  text-2xl font-semibold">
              £1550.00
            </p>
          </div>

          <button
            type="button"
            className="btn | w-min min-w-max justify-self-end rounded-md  bg-skin-brand-darker  py-1 px-2  text-sm font-semibold text-skin-brand"
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-b-skin-line  px-6 py-4  last:border-none  md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="font-semibold text-skin-brand-darker">Overdue</h3>
            <p className="text-skin-inverted  text-2xl font-semibold">
              £443.88
            </p>
          </div>

          <button
            type="button"
            className="btn | w-min min-w-max justify-self-end rounded-md  bg-skin-brand-darker  py-1 px-2  text-sm font-semibold text-skin-brand"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
export default Overview;
