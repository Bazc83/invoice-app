import { useNavigate } from 'react-router';

export function NoInvoices() {
  const navigate = useNavigate();

  return (
    <div className="primary-bg flex flex-col gap-2 rounded-md px-6  shadow-md  py-10 ">
      <div className='max-h-52 flex items-center justify-center'>
        <img src="/images/illustration-empty.svg" alt="no invoices svg" />
      </div>
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
  );
}

export default NoInvoices;
