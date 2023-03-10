import Filters from './Filters';

function InvoicesControlPanel({ state }) {
  return (
    <div
      className={`  flex h-max  flex-col  items-center justify-between gap-6 rounded-md  bg-skin-secondary  px-6 py-6 text-sm text-skin-base transition-transform duration-700 md:static md:w-auto md:translate-x-0
     md:flex-row lg:w-[200px]  lg:flex-col-reverse lg:items-center lg:gap-8`}
    >
      {/* <Filters /> */}
      <Filters state={state} />
    </div>
  );
}
export default InvoicesControlPanel;
