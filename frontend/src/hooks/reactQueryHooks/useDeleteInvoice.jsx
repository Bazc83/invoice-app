import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '../useContextHooks/useAuthContext';

export const useDeleteInvoice = () => {
  const { user } = useAuthContext();

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
