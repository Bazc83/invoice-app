import { useContext} from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './reactQueryHooks/useAuth';

const getInvoicesByPage = async (userToken, pageNumber) => {
  const response = await fetch(`/api/invoices/page/${pageNumber}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const json = await response.json();

  if (response.ok) {
    return json.invoices;
  }
  return json.error;
};

export const usePaginatedInvoices = (page) => {
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices', page],
    queryFn: () => getInvoicesByPage(user.token, page),
    keepPreviousData: true,
    enabled: authData?.jwtValid === true,
  });

  return { data, isLoading, isError, error };
};

export default usePaginatedInvoices;
