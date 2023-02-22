import { useNavigate } from 'react-router';

export function NoInvoices() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center  justify-center">
      <div className="flex  flex-col items-center justify-center gap-8 pt-6">
        <img src="/images/illustration-empty.svg" alt="no invoices svg" />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="px-2  text-center text-xl md:text-2xl">
            No invoices found
          </h1>

          <button
            onClick={() => navigate('/newinvoice')}
            className="btn bg-green-700"
            type="button"
          >
            Add Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoInvoices;
