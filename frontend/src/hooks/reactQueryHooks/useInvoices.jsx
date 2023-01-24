import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import { useAuth } from './useAuth';

const getInvoices = async (userToken) => {
  const response = await fetch('/api/invoices/', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  const json = await response.json();
  if (json?.error) {
    return json;
  }
  if (response.ok) {
    return json;
  }
};

export const useInvoices = () => {
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(user.token),
    enabled: authData?.jwtValid === true,
  });

  return { data, isLoading, isError, error };
};
