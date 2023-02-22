import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './useAuth';

const getInvoiceById = async (userToken, invoiceId) => {
  const response = await fetch(`/api/invoices/${invoiceId}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });


  const json = await response.json();


  if (response.ok) {
    return json;
  }
  return json;
};

export const useFilterInvoiceById = (invoiceId) => {
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const queryResponse = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoiceById(user.token, invoiceId),
    enabled: authData?.jwtValid === true,
  });

  return { ...queryResponse };
};

export default useFilterInvoiceById;
