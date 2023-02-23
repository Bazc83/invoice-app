import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '@/context/AuthContext';

import { useAuth } from './useAuth';

const getDetails = async (userToken) => {
  // eslint-disable-next-line no-underscore-dangle
  const response = await fetch(`/api/user/${userToken._id}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }
  return json;
};

export const useGetUserDetails = () => {
  const { user } = useContext(AuthContext);

  const { authData } = useAuth();

  const queryResponse = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ['user', user._id],
    // eslint-disable-next-line no-underscore-dangle
    queryFn: () => getDetails(user.token),
    enabled: authData?.jwtValid === true,
  });

  return { ...queryResponse };
};

export default useGetUserDetails;
