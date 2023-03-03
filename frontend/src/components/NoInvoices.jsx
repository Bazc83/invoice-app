import { useNavigate } from 'react-router';

export function NoInvoices() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex flex-col gap-2 rounded-md bg-skin-main-bg px-6  py-10 text-skin-base">
      <img
        src="/images/illustration-empty.svg"
        alt="no invoices svg"
        className="w-full sm:w-80"
      />

      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="px-2  text-center text-xl md:text-2xl">
          No invoices found
        </h1>

        <button
          onClick={() => navigate('/newinvoice')}
          className="btn bg-skin-success text-white"
          type="button"
        >
          Add Invoice
        </button>
      </div>
    </div>
  );
}

export default NoInvoices;
