import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './useAuth';

const getInvoices = async (userToken) => {
  const response = await fetch('/api/invoices/', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });


  const json = await response.json();

  // console.log(json.status(200))
  if (response.ok) {
    return json;
  }
  return json.error;
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

export default useInvoices;
