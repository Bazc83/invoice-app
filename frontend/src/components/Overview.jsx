function Overview() {
  return (
    <div className=" w-full  bg-skin-brand py-4">
      <div className="mx-auto flex max-w-3xl flex-col justify-between gap-6 px-6 md:flex-row md:gap-4">
        <div className="flex gap-3 py-2 md:flex-col  ">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="text-skin-brand-lighter  ">Overdue</h3>
            <p className="text-3xl text-white">£10330.00</p>
          </div>
          <div className="flex w-full items-end justify-end md:justify-start">
            <button
              type="button"
              className="btn |  w-max rounded-full  bg-black/30 py-1  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
            >
              View All
            </button>
          </div>
        </div>

        <div className="flex gap-3 py-2 md:flex-col  ">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="text-skin-brand-lighter  ">Quotes</h3>
            <p className="text-3xl text-white">£1330.00</p>
          </div>

          <div className="flex w-full items-end justify-end md:justify-start">
            <button
              type="button"
              className="btn |  w-max rounded-full  bg-black/30 py-1  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
            >
              View All
            </button>
          </div>
        </div>

        <div className="flex gap-3 py-2 md:flex-col  ">
          <div className="flex flex-col gap-2 md:gap-2">
            <h3 className="text-skin-brand-lighter  ">Total</h3>
            <p className="text-3xl text-white">£543434.00</p>
          </div>
          <div className="flex w-full items-end justify-end md:justify-start">
            <button
              type="button"
              className="btn |  w-max rounded-full  bg-black/30 py-1  px-3 text-sm text-white/90 hover:bg-black/50 hover:text-white "
            >
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Overview;
