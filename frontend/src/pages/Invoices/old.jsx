<div
      className="relative flex cursor-pointer flex-col gap-2 rounded-md border border-gray-200 bg-skin-primary px-6 py-6 text-skin-base  shadow-md dark:border-gray-900 sm:gap-1 md:grid md:grid-cols-[1rem_repeat(10,_1fr)_1rem] md:items-baseline md:justify-center  md:gap-2 md:px-0 md:py-6 "
      aria-hidden="true"
    >
      <div className="group absolute inset-0 flex h-full w-full items-center justify-end gap-4 rounded-md bg-skin-secondary/90 px-6 opacity-0 transition-all duration-200 ease-in-out hover:opacity-100">
        <button
          type="button"
          className="btn | hidden bg-skin-danger  text-white group-hover:block"
          onClick={() => showDeleteModal(invoice.id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn | hidden bg-skin-edit text-white  group-hover:block"
          onClick={() => editInvoice(invoice.id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn | hidden bg-skin-success  text-white group-hover:block"
          onClick={() => showFullInvoice(invoice.id)}
        >
          Show
        </button>
      </div>

      {/* Invoice id and paymentDue date */}
      <div className="grid grid-cols-[1fr_2fr]     gap-1  md:col-start-2    md:col-end-6">
        <p className=" text-sm md:text-start md:text-base">#{id}</p>

        {/* Only show payment due date if not paid */}
        {status === 'paid' ? (
          <p className=" text-end text-sm md:text-center md:text-base">
            Invoice Paid
          </p>
        ) : (
          <p className=" text-end text-sm md:text-center md:text-base">
            <span className="md:hidden">Due</span> {getDate(paymentDue)}
          </p>
        )}
      </div>

      <div className="  md:col-start-6 md:col-end-9   md:text-start lg:text-center">
        <p>{clientName} </p>
      </div>
      <div className="flex items-center justify-between  gap-2 md:col-start-9 md:col-end-12 md:w-full md:gap-6">
        <p className="   w-full  lg:text-center">
          {new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'GBP',
          }).format(+amountDueTotal)}
        </p>

        <p
          className={`shrink-1 w-[170px] text-center  md:pl-4 ${paymentStatusColor} rounded-md border py-2 px-1 text-sm capitalize md:rounded-none md:border-none md:py-0 md:px-0 md:text-base`}
        >
          {status}
        </p>
      </div>
    </div>