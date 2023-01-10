import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInvoice } from '../useInvoicesApi';

export const useAddNewInvoice = () => {
  const queryClient = useQueryClient();

  // update invoice on db with invoiceData
  const newInvoiceMutation = useMutation({
    mutationFn: ({ invoiceData }) => addInvoice(invoiceData),

    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
    },
  });

  return { newInvoiceMutation };
};
