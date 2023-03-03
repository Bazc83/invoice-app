
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updateId = async () => {
  const response = await axios.post('/api/invoice/invoiceId');
  return response.data;
};

export const useUpdateInvoiceId = () => {
  const queryClient = useQueryClient();

  const updateIdMutation = useMutation({
    mutationFn: () => updateId(),
    onSuccess: () => {
      queryClient.invalidateQueries('invoiceId');
    },
  });

  return { updateIdMutation };
};

export default useUpdateInvoiceId;
