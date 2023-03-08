import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './reactQueryHooks/useAuth';

const getInvoicesByPage = async ({ userToken, payload }) => {
  const { page, size, quote, paid, pending } = payload;

  const response = await fetch(
    `/api/invoices/page?page=${page}&size=${size}&quote=${quote}&pending=${pending}&paid=${paid}`,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  return json.error;
};

export const usePaginatedInvoices = (payload) => {
  const { size, page, quote, pending, paid } = payload;
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices', page, size, quote, pending, paid],
    queryFn: () => getInvoicesByPage({ userToken: user.token, payload }),
    keepPreviousData: true,
    enabled: authData?.jwtValid === true,
  });

  return { data, isLoading, isError, error };
};

export default usePaginatedInvoices;
