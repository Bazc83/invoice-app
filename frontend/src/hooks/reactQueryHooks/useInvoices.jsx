import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../useContextHooks/useAuthContext';

export const useInvoices = () => {
  const { user } = useAuthContext();

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
