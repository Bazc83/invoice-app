import { useQuery } from '@tanstack/react-query';

const checkToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(!user) return null;

  const { token } = user;

  try {
    const response = await fetch('/api/user/checktoken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const useAuth = () => {
  const {
    data: authData,
    isLoading: authLoading,
    error: authError,
    isError: authIsError,
  } = useQuery({
    queryKey: ['authContext'],
    queryFn: () => checkToken(),
  });
  return { authData, authLoading, authError, authIsError };
};

export default useAuth;
