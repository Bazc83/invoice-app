import { AuthContext } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useInvoices = () => {
  const { user } = useContext(AuthContext)

  const getInvoices = async () => {
    const response = await fetch('/api/invoices/', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices,
    enabled: user !== null,
  });

  return { data, isLoading, isError, error };
};
