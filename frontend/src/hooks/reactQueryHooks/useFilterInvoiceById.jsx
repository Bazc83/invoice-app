import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useFilterInvoiceById = (invoiceId) => {
  const { user } = useContext(AuthContext)

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
