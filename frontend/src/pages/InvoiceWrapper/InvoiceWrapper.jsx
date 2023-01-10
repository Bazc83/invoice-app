import { InvoiceContextProvider } from '@/context/useInvoiceContext';
import { Invoice } from '../Invoice/Invoice';

export const InvoiceWrapper = () => {
  return (
    <InvoiceContextProvider>
      <Invoice />
    </InvoiceContextProvider>
  );
};
