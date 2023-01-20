import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../useContextHooks/useAuthContext';

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const updateInvoice = async (invoiceId, invoiceData) => {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
      method: 'PUT',
      body: JSON.stringify(invoiceData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      return json;
    }
  };

  // update invoice on db with invoiceData
  const updateInvoiceMutation = useMutation({
    mutationFn: ({ invoiceId, invoiceData }) =>
      updateInvoice(invoiceId, invoiceData),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
    },
  });

  return { updateInvoiceMutation };
};
