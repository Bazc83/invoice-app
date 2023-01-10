import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoice } from '../useInvoicesApi';

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  // update invoice on db with invoiceData
  const updateInvoiceMutation = useMutation({
    mutationFn: ({invoiceId, invoiceData}) => updateInvoice(invoiceId, invoiceData),

    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
    },
  });

  return { updateInvoiceMutation };
};
