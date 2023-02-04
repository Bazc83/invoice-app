// requires the following props

// modalContent={
// header ="string",
// text = "string",
// }
// confirmActionFunction = function
// cancelActionFunction = function

function ConfirmActionModalTemplate(props) {
  return (
    <div className="fixed inset-0 z-20 h-full   w-full bg-black bg-opacity-70 ">
      <div className="absolute top-[20%] left-[50%] z-50 flex w-[calc(100%_-_2rem)] max-w-xl -translate-x-[50%] -translate-y-[20%] flex-col items-start justify-center gap-6 rounded-md bg-gray-100 p-6 dark:bg-gray-800 ">
        <h1 className="text-xl font-semibold">{props?.modalContent?.header}</h1>
        <p className="secondary-text text-lg">{props?.modalContent?.text}</p>
        <div className="flex w-full justify-end gap-4 ">
          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white  dark:border-gray-200 dark:text-gray-200 hover:dark:border-gray-900 hover:dark:bg-gray-900"
            onClick={props?.cancelActionFunction}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn | flex items-center  justify-center gap-2   bg-red-700 text-white hover:bg-red-900"
            onClick={props?.confirmActionFunction}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmActionModalTemplate;
