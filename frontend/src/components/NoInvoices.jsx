export function NoInvoices() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex max-w-[clamp(217px,_40vw,_250px)] flex-col items-center justify-center gap-8 pt-6">
        <img src="/images/illustration-empty.svg" alt="no invoices svg" />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="px-2  text-center text-2xl">There is nothing here</h1>

          <p className="text-center">
            Create invoice by clicking the
            <span className="font-semibold"> Add</span> <span> invoice </span>
            button and get started
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoInvoices;
