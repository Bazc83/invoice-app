import { useContext } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

export const useAddNewInvoice = () => {
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);

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
    }
    return json.error;
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

export default useAddNewInvoice;
