import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useCheckToken } from '../useCheckToken';

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

  const { jwtValid } = useCheckToken();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(user.token),
    enabled: !!jwtValid,
  });

  return { data, isLoading, isError, error };
};
