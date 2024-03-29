import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './reactQueryHooks/useAuth';

const getInvoicesByPage = async ({ userToken, payload }) => {
  const { pageNumber, itemsPerPage, quote, paid, pending, sortBy } = payload;

  const response = await fetch(
    `/api/invoices/page?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}&quote=${quote}&pending=${pending}&paid=${paid}&sort=${sortBy}`,
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
  const { itemsPerPage, pageNumber, quote, pending, paid, sortBy } = payload;
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['invoices', pageNumber, itemsPerPage, quote, pending, paid, sortBy],
    queryFn: () => getInvoicesByPage({ userToken: user.token, payload }),
    keepPreviousData: true,
    enabled: authData?.jwtValid === true,
  });

  return { data, isLoading, isError, error };
};

export default usePaginatedInvoices;
