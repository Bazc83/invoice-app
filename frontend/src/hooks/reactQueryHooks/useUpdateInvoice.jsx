import { useContext} from 'react';
import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

export const useUpdateInvoice = (invoiceIdValue) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useContext(AuthContext);



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

    if (response.ok) {
      return json;
    }

    throw new Error(json.error);
  };

  // update invoice on db with invoiceData
  const updateInvoiceMutation = useMutation({
    mutationFn: ({ invoiceId, invoiceData }) =>
      updateInvoice(invoiceId, invoiceData),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
      navigate(`/invoices/${invoiceIdValue}`);
    },
  });

  return { updateInvoiceMutation };
};

export default useUpdateInvoice;
