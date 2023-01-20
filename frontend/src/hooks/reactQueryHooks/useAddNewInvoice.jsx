import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../useContextHooks/useAuthContext';

export const useAddNewInvoice = () => {
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const addInvoice = async (invoiceData) => {
    const response = await fetch(`/api/invoices/`, {
      method: 'POST',
      body: JSON.stringify(invoiceData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      console.log(json.error);
    }
  };

  // update invoice on db with invoiceData
  const newInvoiceMutation = useMutation({
    mutationFn: ({ invoiceData }) => addInvoice(invoiceData),

    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
    },
  });

  return { newInvoiceMutation };
};
