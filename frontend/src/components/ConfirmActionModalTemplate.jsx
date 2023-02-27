// requires the following props

// modalContent={
// header ="string",
// text = "string",
// confirmBtn= "string",
// cancelBtn = "string"
// }
// confirmActionFunction = function
// cancelActionFunction = function

function ConfirmActionModalTemplate({
  modalContent,
  cancelActionFunction,
  confirmActionFunction,
  invoiceId,
}) {
  return (
    <div className="fixed inset-0 z-20 h-full   w-full bg-black bg-opacity-70 ">
      <div className="absolute top-[20%] left-[50%] z-50 flex w-[calc(100%_-_2rem)] max-w-xl -translate-x-[50%] -translate-y-[20%] flex-col items-start justify-center gap-6 rounded-md bg-skin-secondary p-6 text-skin-base  ">
        <h1 className="text-xl font-semibold">{modalContent?.header}</h1>
        <p className="text-lg text-skin-muted">{modalContent?.text}</p>
        <div className="flex w-full justify-end gap-4 ">
          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2 border border-skin-btn-default text-skin-base hover:bg-skin-btn-default hover:text-skin-inverted"
            onClick={cancelActionFunction}
          >
            {modalContent?.cancelBtn}
          </button>

          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2   bg-skin-danger text-white hover:opacity-90"
            onClick={() => confirmActionFunction(invoiceId)}
          >
            {modalContent?.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModalTemplate;
