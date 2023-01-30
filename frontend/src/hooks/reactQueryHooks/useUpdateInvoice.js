import { AuthContext } from '@/context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

  const updateInvoice = async (invoiceId, invoiceData) => {

    console.log(invoiceData)
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
