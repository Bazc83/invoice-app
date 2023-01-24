import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useAuth } from './useAuth';

const getInvoiceById = async (userToken, invoiceId) => {
  const response = await fetch(`/api/invoices/${invoiceId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });

  const json = await response.json();
  if (response.ok) {
    return json;
  }
};

export const useFilterInvoiceById = (invoiceId) => {
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const queryResponse = useQuery({
    queryKey: ['filteredInvoice', invoiceId],
    queryFn: () => getInvoiceById(user.token, invoiceId),
    enabled: authData?.jwtValid === true,
  });

  return { ...queryResponse };
};
