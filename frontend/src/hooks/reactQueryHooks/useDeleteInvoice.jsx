import { useContext } from 'react';

import { useMutation } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

export const useDeleteInvoice = () => {
  const { user } = useContext(AuthContext);

  const deleteInvoice = async (invoiceId) => {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }

    return json.error;
  };

  const { mutateAsync, isLoading } = useMutation(deleteInvoice);

  const deleteSelectedInvoice = async (invoiceId) => {
    if (!user) return;
    try {
      await mutateAsync(invoiceId);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { deleteSelectedInvoice, isLoading };
};

export default useDeleteInvoice;
