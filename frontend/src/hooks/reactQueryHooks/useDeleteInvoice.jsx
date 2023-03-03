import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';
import useModalStore from '@/context/useModalStore';

export const useDeleteInvoice = () => {
  const { user } = useContext(AuthContext);
  const hideDeleteModal = useModalStore((s) => s.hideDeleteModal);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteInvoice = async (invoiceId) => {
    const response = await fetch(`/api/invoices/invoice/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(response.error);
    }

    return json;
  };

  const toastSuccess = (value) => toast.success(value);

  const deleteInvoiceMutation = useMutation({
    mutationFn: ({ invoiceId }) => deleteInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');

      hideDeleteModal();
      toastSuccess('Successfully deleted invoice');
      navigate('/');
    },
  });
  // const { mutateAsync, isLoading, isSuccess } = useMutation(deleteInvoice);

  // const deleteSelectedInvoice = async (invoiceId) => {
  //   if (!user) return;
  //   try {
  //     const deleteResponse = await mutateAsync(invoiceId);

  //     if (isSuccess) {
  //       console.log('success');
  //     }

  //     console.log(deleteResponse);
  //   } catch (error) {
  //     console.log(error);
  //     // throw new Error(error);
  //   }
  // };

  return { deleteInvoiceMutation };
};

export default useDeleteInvoice;
