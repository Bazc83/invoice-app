import { useMemo, useState } from 'react';

import useGetUserQuotes from '@/hooks/reactQueryHooks/useGetUserQuotes';

function Overview() {
  const { data: quotesData } = useGetUserQuotes();

  const [quotesTotal, setQuotesTotal] = useState('0.00');

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
    <div className=" w-full  bg-skin-brand py-4">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-6 px-6 py-4 md:flex-row md:gap-4 md:px-6 md:py-2">
        <div className="flex flex-wrap items-end justify-between gap-2   border-b-2 border-b-white/10 pt-0 pb-8 last:border-none last:pb-2 md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="text-skin-brand-lighter  ">Overdue</h3>
            <p className="text-2xl text-white md:text-3xl">£0.00</p>
          </div>

          <button
            type="button"
            className="btn | w-min min-w-max justify-self-end rounded-md bg-black/30 py-2  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2   border-b-2 border-b-white/10 pt-0 pb-8 last:border-none last:pb-2 md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 ">
            <h3 className="text-skin-brand-lighter  ">Quotes</h3>
            <p className="text-2xl text-white md:text-3xl">£{quotesTotal}</p>
          </div>

          <button
            type="button"
            className="btn |  w-min min-w-max rounded-md bg-black/30 py-2  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-2   border-b-2 border-b-white/10 pt-0 pb-5 last:border-none last:pb-2 md:flex-col md:items-start md:gap-3 md:border-none md:py-2">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="text-skin-brand-lighter  ">Total</h3>
            <p className="text-2xl text-white md:text-3xl">£543434.00</p>
          </div>

          <button
            type="button"
            className="btn |  w-min min-w-max rounded-md bg-black/30 py-2  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
export default Overview;
