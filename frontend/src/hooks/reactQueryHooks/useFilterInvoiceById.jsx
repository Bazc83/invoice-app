import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../useAuthContext';

export const useFilterInvoiceById = (invoiceId) => {
  const { user } = useAuthContext();

  const getInvoiceById = async (invoiceId) => {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }
  };

  const queryResponse = useQuery({
    queryKey: ['filteredInvoice', invoiceId],
    queryFn: () => getInvoiceById(invoiceId),
    staleTime: 1000,
    enabled: user !== null,
  });

  return { ...queryResponse };
};
