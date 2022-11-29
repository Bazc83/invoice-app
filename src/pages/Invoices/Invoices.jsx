import { DarkModeContext } from '@/App';
import { InvoicePreview } from '@/components/InvoicePreview';
import { useContext } from 'react';
import { InvoicesPageControls } from './InvoicesPageControls';
export const Invoices = () => {
  const { light } = useContext(DarkModeContext);

  return (
    <div className='container'>
      <InvoicesPageControls light={light} />

      <InvoicePreview
        invoiceRef={'RT3080'}
        name={'Jensen Huang'}
        dueDate={'Due  20 Sep 2021'}
        amount={'1,800.90'}
        paymentStatus={'paid'}
      />
    </div>
  );
};
