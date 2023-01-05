import { useMutation } from '@tanstack/react-query';
import { deleteInvoice } from '../useInvoicesApi';

export const useDeleteInvoice = () => {
  const { mutateAsync, isLoading } = useMutation(deleteInvoice);

  const deleteSelectedInvoice = async (invoiceId) => {
    try {
      await mutateAsync(invoiceId);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteSelectedInvoice, isLoading };
};
