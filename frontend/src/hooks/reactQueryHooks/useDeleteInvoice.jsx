import { AuthContext } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

export const useDeleteInvoice = () => {
  const { user } = useContext(AuthContext)

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
  };

  const { mutateAsync, isLoading } = useMutation(deleteInvoice);

  const deleteSelectedInvoice = async (invoiceId) => {
    if (!user) return;
    try {
      await mutateAsync(invoiceId);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteSelectedInvoice, isLoading };
};
