import { useNavigate } from 'react-router';

export function NotFoundPage() {

  const navigate = useNavigate();
  return (
    <div className="flex items-center  justify-center">
      <div className="flex  flex-col items-center justify-center gap-8 pt-6">
        <img src="/images/illustration-empty.svg" alt="no invoices svg" />
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="px-2  text-center text-xl md:text-2xl">Page not found!</h1>
        
         <button onClick={()=> navigate("/")} className='btn bg-skin-success text-lg' type="button">Return to Invoices</button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
