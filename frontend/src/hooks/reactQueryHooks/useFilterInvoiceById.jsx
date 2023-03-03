import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';
import useModalStore from '@/context/useModalStore';

import { useAuth } from './useAuth';

const getInvoiceById = async (userToken, invoiceIdValue) => {
  const response = await fetch(`/api/invoices/invoice/${invoiceIdValue}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });

  if (!response.ok) {
    return response;
  }

  const json = await response.json();

  return json;
};

export const useFilterInvoiceById = (invoiceId) => {
  // If delete modal is shown stops query
  const enableQuery = useModalStore((s) => s.enableQuery);

  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const queryResponse = useQuery({
    queryKey: ['invoice', invoiceId],
    queryFn: () => getInvoiceById(user.token, invoiceId),
    enabled: authData?.jwtValid === true && enableQuery === true,
  });

  return { ...queryResponse };
};

export default useFilterInvoiceById;
